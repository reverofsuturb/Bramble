const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const environment = require("../../config");
const isProduction = environment === "production";
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

/*  Google AUTH  **********************************************/

const oauthClient = process.env.GOOGLE_OAUTH_CLIENT_ID;
const oauthSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

const { OAuth2Client } = require("google-auth-library");

// For saving some state for out OAuth flow (mostly PKCE related)!!
let oAuthState = {
  codeVerifier: "",
  nonce: "",
  state: "",
};

// A function for generating our random values for state and nonce.
function generateRandomString(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

/**************************************************************/

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.get("/googleOauthLogin", async (req, res) => {
  // Your redirect URI will look different!
  const redirectUri = isProduction
    ? "https://bramble-idq1.onrender.com/api/users/googleOauthCallback"
    : "http://localhost:8000/api/users/googleOauthCallback";

  // Configure our Client class
  const oAuth2Client = new OAuth2Client(oauthClient, oauthSecret, redirectUri);

  // Generate the codeVerifier and codeChallenge for our PKCE security layer!
  const { codeVerifier, codeChallenge } =
    await oAuth2Client.generateCodeVerifierAsync();

  // Save our state for verification later.
  oAuthState.codeVerifier = codeVerifier;
  oAuthState.state = generateRandomString(16); // Generate a random state string
  oAuthState.nonce = generateRandomString(32); // Generate a random nonce string

  // Have our SDK generate the URL encoded with the appropriate values to start the flow.
  const authorizationUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // Forces a Refresh token to be sent!
    scope: "https://www.googleapis.com/auth/userinfo.profile openid email",
    prompt: "select_account consent", // select_account is necessary to garauntee that a user is prompted for account selection even when logged in to Google.
    state: oAuthState.state, // CSRF
    nonce: oAuthState.nonce, // CSRF
    code_challenge_method: "S256", // PKCE
    code_challenge: codeChallenge, // PKCE
  });

  res.redirect(authorizationUrl); // Send a redirect to the client's browser which will fetch the Google Select an Account menu.
});

router.get("/googleOauthCallback", async (req, res) => {
  // For the object that shall be returned from OpenID as a JWT payload!
  let claims = {};
  const code = req.query.code; // The ephemeral code returned by Google.

  // Our CSRF for the flow
  const googleState = req.query.state;
  if (googleState !== oAuthState.state) {
    res.status(500).json({ error: "Could not verify client" });
  }

  try {
    const redirectUrl = isProduction
      ? "https://bramble-idq1.onrender.com/api/users/googleOauthCallback"
      : "http://localhost:8000/api/users/googleOauthCallback";

    const oAuth2Client = new OAuth2Client(
      oauthClient,
      oauthSecret,
      redirectUrl
    );

    const params = {
      code: code,
      codeVerifier: oAuthState.codeVerifier, // Pass the code_verifier
    };

    const res = await oAuth2Client.getToken(params); // Exchange code for access token.
    await oAuth2Client.setCredentials(res.tokens); // Set the credentials property of our Client class

    const user = oAuth2Client.credentials;

    const idToken = user.id_token; // The token from OpenID Connect
    const expiry = user.expiry_date;

    // Verify that the JWT signature is valid!
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      oauthClient,
      expiry,
    });
    const payload = ticket.getPayload();

    // More CSRF! Verify our nonce from earlier.
    const openIdNonce = payload.nonce;
    if (openIdNonce !== oAuthState.nonce) {
      res.status(500).json({ error: "Could not verify client!" });
    }

    claims = payload;
  } catch (err) {
    console.log("Could not sign in with Google", err);
  }

  const gmail = claims.email; // Extract the user's email from the ID Token claims!

  // Check to see if a user with this email address already exists
  let user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: gmail,
        email: gmail,
      },
    },
  });

  let safeUser = {};
  if (user) {
    safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  } else {
    // If no user exists, we shall create a new one!
    user = await User.create({ email: gmail, username: claims.name }); // Note: No password!!!

    safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  // Let's garbage collect those random values!!
  oAuthState = {
    codeVerifier: "",
    nonce: "",
    state: "",
  };

  await setTokenCookie(res, safeUser);
  if (isProduction) return res.redirect("https://bramble-idq1.onrender.com/");
  return res.redirect("http://localhost:5173/"); // Back to the browser!
});

router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
