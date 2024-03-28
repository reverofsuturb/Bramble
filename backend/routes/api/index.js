const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const productsRouter = require("./products.js");
const shopsRouter = require("./shops.js");

const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/shops", shopsRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  const express = require("express");
  const router = express.Router();
  const apiRouter = require("./api");

  router.use("/api", apiRouter);

  // Static routes
  // Serve React build files in production
  if (process.env.NODE_ENV === "production") {
    const path = require("path");
    // Serve the frontend's index.html file at the root route
    router.get("/", (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, "../../frontend", "dist", "index.html")
      );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/dist")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, "../../frontend", "dist", "index.html")
      );
    });
  }

  // Add a XSRF-TOKEN cookie in development
  if (process.env.NODE_ENV !== "production") {
    router.get("/api/csrf/restore", (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken);
      res.status(200).json({
        "XSRF-Token": csrfToken,
      });
    });
  }

  module.exports = router;

  return res.json(req.user);
});

module.exports = router;
