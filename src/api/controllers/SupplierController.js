const { string } = require("joi");
const path = require("path");
const SupplierModel = require("../models/SupplierModel");

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
};
