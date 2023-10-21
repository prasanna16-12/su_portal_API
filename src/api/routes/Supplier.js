const express = require("express");
const SupplierRouter = express.Router();
const SupplierController = require("../controllers/SupplierController");

/* validation */
const supplierUpdatedDetailsValidation = require("../middlewares/validation/UpdateDetailsValidation");
const listViewRFQvalidation = require("../middlewares/validation/RfqListViewValidationSupplier");
const rfqQuoteValidation = require("../middlewares/validation/RfqQuoteValidation")
const rfqQuoteSubmitValidation = require("../middlewares/validation/RfqQuoteSubmitValidation")

SupplierRouter

  /* updated and insert details into -> tbl_supplier_details_update */
  .put(
    "/Update",
    supplierUpdatedDetailsValidation,
    SupplierController.addUpdateDetails
  )

  /* create RFQ */
  .post("/rfq/listView", listViewRFQvalidation, SupplierController.listViewRFQ)

  .post("/rfq/quote/", rfqQuoteValidation, SupplierController.quoteRFQ)

  .post("/rfq/quote/:id/update", rfqQuoteValidation, SupplierController.updateRfqQuote)

  .post("/rfq/quote/submit", rfqQuoteSubmitValidation, SupplierController.submitQuote)
  .post("/rfq/quote/nobid", rfqQuoteSubmitValidation, SupplierController.noBidQuote)
  
  /* get RFQ data by ID */
  .get("/rfq/:id", SupplierController.RfqDetailsForSupplier);

module.exports = SupplierRouter;
