const ContactPersonModel = require('../models/ContactPersonModel')

module.exports = {


    addSupplierCompanyDetails: async (req, res) => {
        try {
            const data = await ContactPersonModel.addSupplierCompanyDetails(req.body)
            //console.log(data);
            return res.status(200).json({
                SuplierID: data[0][0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                SupplierData: -1,
                message: error.message
            })
        }
    },

    authenticateContactPerson: async (req, res) => {
        try {
            const authStatus = await ContactPersonModel.authenticateContactPerson(req.body)
            console.log(authStatus)
            return res.status(200).json({
                authentication: authStatus,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                authentication: 0,
                message: error.message
            })
        }
    },

    newOTP: async (req, res) => {
        try {
            const status = await ContactPersonModel.newOTP(req.body)
            return res.status(200).json({
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

}