const express = require("express");
const GenericRouter = express.Router();
const BuyerController = require("../controllers/BuyerController");
const GenericController = require("../controllers/GenericController");

/* validation */

const tokenCheckAuth = require("../middlewares/authorization/checkToken");

GenericRouter
  /* get pending approvals for onboarding */
  .get("/Approve", BuyerController.allPendingApproval)

  /* check token validation */
  .get("/checkToken/:email", tokenCheckAuth)

  /* get company details by ID */
  .get("/SupplierCompany/:id", BuyerController.CompanyDetails)

  /* get company details */
  .get("/vendormetadata/", GenericController.VendorInfo)

  /* get company details by ID*/
  .get("/vendormetadata/:id", GenericController.VendorInfoByID)

  /* get company details by ID*/
  .get("/buyermetadata/:id", GenericController.BuyerInfoByID)

  /* get all company details by BUYER ID*/
  .get("/buyer/:id/vendor", GenericController.BuyerVendorInfoByID)

  /* get all company details by BUYER ID*/
  .get(
    "/manager/:id/buyer",
    GenericController.ManagerBuyerVendorInfoByManagerID
  )

  /* get company details by ID*/
  .get("/managermetadata/:id", GenericController.ManagerInfoByID)

  /* get company details by ID*/
  .get("/suppliermetadata/:id", GenericController.SupplierInfoByID)

  /* get material meta data*/
  .get("/materialmetadata/", GenericController.materialMetadata)


module.exports = GenericRouter;
