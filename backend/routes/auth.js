const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");
const authController = require("../controllers/Auth");
//create new user / POST -> register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Enter username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 4 characters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Enter password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
  ],
  authController.register
);

//login user / POST -> login
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Enter password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
  ],
  authController.login
);

//check user login or not login
router.get("/get-current-user", authMiddleware, authController.checkLoginUser);

module.exports = router;
