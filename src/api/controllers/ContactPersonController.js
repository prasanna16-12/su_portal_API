const ContactPersonModel = require("../models/ContactPersonModel");

module.exports = {
  addSupplierCompanyDetails: async (req, res) => {
    try {
      const data = await ContactPersonModel.addSupplierCompanyDetails(req.body);
      //console.log(data);
      return res.status(201).json({
        result: data[0][0],
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  authenticateContactPerson: async (req, res) => {
    try {
      const obj = await ContactPersonModel.authenticateContactPerson(req.body);

      const authStatus = ContactPersonModel.verifyContactPerson(
        obj,
        req.body.OTP
      );

      if (obj !== undefined) {
        obj["ID"] = obj["supp_ID"];
        obj["mobile"] = obj["supp_mobile"];
        obj["email"] = obj["supp_email"];
        obj["name"] = obj["supp_name"];
        obj["company_name"] = obj["supp_company_name"];
        delete obj.OTP;
        delete obj.link_status;
        delete obj.OTP_validity_TS;
        delete obj.supp_created_on;
        delete obj.supp_ID;
        delete obj.supp_mobile;
        delete obj.supp_email;
        delete obj.supp_name;
        delete obj.supp_company_name;
      }

      return res.status(200).json({
        message: authStatus,
        result: authStatus === "Success" ? obj : null,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  newOTP: async (req, res) => {
    try {
      const status = await ContactPersonModel.newOTP(req.body);
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
