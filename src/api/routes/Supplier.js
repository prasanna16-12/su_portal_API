const express = require("express");
const SupplierRouter = express.Router();
const SupplierController = require("../controllers/SupplierController");

/* validation */
const supplierUpdatedDetailsValidation = require("../middlewares/validation/UpdateDetailsValidation");
const listViewRFQvalidation = require("../middlewares/validation/RfqListViewValidationSupplier");

SupplierRouter

  /* updated and insert details into -> tbl_supplier_details_update */
  .put(
    "/Update",
    supplierUpdatedDetailsValidation,
    SupplierController.addUpdateDetails
  )

  /* create RFQ */
  .post("/rfq/listView", listViewRFQvalidation, SupplierController.listViewRFQ);

  

module.exports = SupplierRouter;
