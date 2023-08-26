const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/UserController");

/* validation */
const validateUserLoginData = require("../middlewares/validation/loginUserValidation");
const validatePasswordResetData = require("../middlewares/validation/changePasswordValidation");
const validatePasswordForgotData = require("../middlewares/validation/forgetPasswordValidation");
const validatePasswordForgotLinkData = require("../middlewares/validation/forgetPasswordLinkValidation");

UserRouter

  /* login */
  .post("/Login", validateUserLoginData, UserController.loginUser)

  /* forgot password  link */
  .get(
    "/Password/:email",
    validatePasswordForgotLinkData,
    UserController.sendForgetPasswordLink
  )

  /* change password update previous*/
  .put("/Password", validatePasswordResetData, UserController.changePassword)

  /* forgot password  create new  */
  .post("/Password", validatePasswordForgotData, UserController.forgetPassword);

module.exports = UserRouter;
