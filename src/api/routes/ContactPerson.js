const express = require("express");
const ContactPersonRouter = express.Router();
const ContactPersonController = require("../controllers/ContactPersonController");

/* validation */
const validateCompanyData = require("../middlewares/validation/SupplierCompDetailsValidation");
const validatecontactPersonData = require("../middlewares/validation/SupplierAuthValidation");
const validatecontactPersonNewOTP = require("../middlewares/validation/NewOTPValidationContactPerson");

ContactPersonRouter
  /* add company details */
  .post(
    "/CompanyDetails",
    validateCompanyData,
    ContactPersonController.addSupplierCompanyDetails
  )

  /* authenticate contact person */
  .post(
    "/Verify",
    validatecontactPersonData,
    ContactPersonController.authenticateContactPerson
  )

  /* Resend OTP */
  .post("/OTP", validatecontactPersonNewOTP, ContactPersonController.newOTP);

module.exports = ContactPersonRouter;
