const AdminModel = require('../models/AdminModel')

module.exports = {

    createNewUser: async (req, res) => {
        try {
            const data = await AdminModel.createNewUser(req.body)
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
    getAllUsers: async (req, res) => {
        try {
            const data = await AdminModel.getAllUsers()
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

    updateUser: async (req, res) => {
        try {
            const data = await AdminModel.updateUser(req.body)
            return res.status(200).json({
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    managerVendorInfo: async (req, res) => {
        try {
            const data = await AdminModel.managerVendorInfo()
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
}