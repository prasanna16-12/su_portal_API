const UserModel = require("../models/UserModel");

module.exports = {
  // createNewUser: async (req, res) => {
  //     try {
  //         const data = await UserModel.createNewUser(req.body)
  //         return res.status(201).json({
  //             result: data,
  //             message: 'Success'
  //         })
  //     } catch (error) {
  //         return res.status(500).json({
  //             result: -1,
  //             message: error.message
  //         })
  //     }
  // },

  loginUser: async (req, res) => {
    try {
      //console.log(JSON.stringify(req.body));
      const data = await UserModel.loginUser(req.body);
      return res.status(200).json({
        result: data.result,
        message: data.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const data = await UserModel.getUserData(req.body);

      if (data.result === -1) {
        return res.status(200).json({
          message: data.message,
        });
      }
      //user exist
      let obj = data.result;

      const result = await UserModel.changePassword(obj, req.body);
      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  sendForgetPasswordLink: async (req, res) => {
    try {
      const data = await UserModel.getUserData(req.params);
      //console.log(data);
      if (data.result === -1) {
        return res.status(200).json({
          message: data.message,
        });
      }
      //user exist
      let result = await UserModel.sendForgetPasswordLink(data.result);
      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      let token = req.body.token;
      let new_pwd = req.body.new_password;

      const data = await UserModel.getDataFromToken(token);
      //console.log(data);
      if (data.result === -1) {
        return res.status(200).json({
          message: data.message,
        });
      }
      //user exist
      let obj = data.result;
      //console.log(obj);
      let result = await UserModel.forgotPassword(new_pwd, obj.user_ID);
      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
