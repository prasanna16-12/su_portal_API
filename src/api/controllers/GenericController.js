const AdminModel = require('../models/AdminModel')
const GenericModel = require('../models/GenericModel')

module.exports = {


    VendorInfo: async (req, res) => {
        try {
            
            const data = await GenericModel.VendorMetaData()
            return res.status(200).json({
                result: data,
                count: data.length,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
}