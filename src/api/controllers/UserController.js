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
}