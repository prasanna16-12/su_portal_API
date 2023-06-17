const UserModel = require('../models/UserModel')

module.exports = {

    createNewUser: async (req, res) => {
        try {
            const data = await UserModel.createNewUser(req.body)
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    loginUser: async (req, res) => {
        try {
            const data = await UserModel.loginUser(req.body)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    changePassword: async (req, res) => {
        try {
            const data = await UserModel.getUserData(req.body)
            if (data.result === -1) {
                return res.status(404).json(data.message)
            }
            //user exist
            let obj = data.message
            const result = await UserModel.changePassword(obj, req.body)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },
}