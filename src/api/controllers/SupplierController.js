const path = require("path");
const SupplierModel = require("../models/SupplierModel");
const RFQ = require("../models/RFQ");

module.exports = {
  addUpdateDetails: async (req, res) => {
    try {
      const data = await SupplierModel.addUpdateDetailsStaggingTable(req.body);
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  listViewRFQ: async (req, res) => {
    try {
      const data = await RFQ.getlistViewSupplierRFQ(
        req.body,
        req.user_info.user_ID
      );
      //console.log(data[0]);
      //const _result = await RFQ.getlistViewRFQDetails(data[0])
      //await RFQ.addRFQVendors(req.body.vendors, data[0].rfq_header_ID)
      //console.log(_result);
      return res.status(200).json({
        result: data[0],
        count: data[0].length,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  quoteRFQ: async (req, res) => {
    try {
      const data = await RFQ.quoteRFQ(req.body, req.user_info.user_ID);

      return res.status(200).json({
        result: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updateRfqQuote: async (req, res) => {
    try {
      const data = await RFQ.updateRfqQuote(req.body, req.params.id, req.user_info.user_ID);

      return res.status(200).json({
        result: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  submitQuote: async (req, res) => {
    try {
      const data = await RFQ.changeQuoteStatus(req.body, "SUBMIT");

      return res.status(200).json({
        result: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  noBidQuote: async (req, res) => {
    try {
      const data = await RFQ.changeQuoteStatus(req.body, "NO BID");

      return res.status(200).json({
        result: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  RfqDetailsForSupplier: async (req, res) => {
    try {
      const data = await RFQ.getRFQDetailsByIDForSupplier(
        req.params.id,
        req.user_info.user_ID
      );
      
      //console.log(data);
      return res.status(200).json({
        result: data,
      });
    } catch (error) {
      //console.log(error);
      return res.status(error.status).json({
        message: error.message,
      });
    }
  },
};
