const AdminModel = require("../models/AdminModel");

module.exports = {
  createNewUser: async (req, res) => {
    try {
      //console.log(req.userData); can be further used for permisson

      const data = await AdminModel.createNewUser(req.body);
      return res.status(201).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await AdminModel.getAllUsers();
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const data = await AdminModel.updateUser(req.body);
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  userMetaData: async (req, res) => {
    try {
      const data = await AdminModel.userMetaData();
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  roleMetaData: async (req, res) => {
    try {
      const data = await AdminModel.roleMetaData();
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
