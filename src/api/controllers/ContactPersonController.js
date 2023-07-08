const ContactPersonModel = require('../models/ContactPersonModel')

module.exports = {


    addSupplierCompanyDetails: async (req, res) => {
        try {
            const data = await ContactPersonModel.addSupplierCompanyDetails(req.body)
            //console.log(data);
            return res.status(201).json({
                result: data[0][0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    authenticateContactPerson: async (req, res) => {
        try {
            const obj = await ContactPersonModel.authenticateContactPerson(req.body)
            
            

            const authStatus = ContactPersonModel.verifyContactPerson(obj, req.body.OTP)

            return res.status(200).json({
                message: authStatus
            })
        } catch (error) {
            return res.status(500).json({
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