const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateCategory = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Category name must be in letters and a minimum of three characters to a maximum of thirty characters."
    ),
  handleValidationErrors,
];

const validateProduct = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters."),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage(
      "Price must be entered as a float, preferably in an XX.XX format"
    ),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 900 })
    .withMessage("Description must be between 10 and 900 characters."),
  check("details")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 100 })
    .withMessage("Details must be selected."),
  check("shipping")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 100 })
    .withMessage("Shipping must be selected."),
  check("category_id")
    .exists({ checkFalsy: true })
    .withMessage("Please select a category."),
  handleValidationErrors,
];

const validateShop = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters."),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 900 })
    .withMessage("Description must be between 10 and 900 characters."),
  check("policies")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 250 })
    .withMessage("Policy must be selected."),
  check("category_id")
    .exists({ checkFalsy: true })
    .withMessage("Please select a category."),
  handleValidationErrors,
];

const validateReview = [
  check("body")
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 200 })
    .withMessage("Description must be between 10 and 200 characters."),
  check("rating")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
    handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateCategory,
  validateProduct,
  validateShop,
  validateReview,
};
