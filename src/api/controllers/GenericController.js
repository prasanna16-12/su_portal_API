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

    VendorInfoByID: async (req, res) => {
        try {
            
            const data = await GenericModel.VendorMetaDataByID(req.params.id)
            //console.log(data);
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    BuyerInfoByID: async (req, res) => {
        try {
            
            const data = await GenericModel.BuyerMetaDataByID(req.params.id)
            //console.log(data);
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    BuyerVendorInfoByID: async (req, res) => {
        try {
            
            const data = await GenericModel.BuyerVendorDataByID(req.params.id)
            
            //console.log(data);
            return res.status(200).json({
                result: data,
                count:data["Vendor"].length,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    ManagerBuyerVendorInfoByManagerID: async (req, res) => {
        try {
            
            const data = await GenericModel.ManagerBuyerVendorInfoByManagerID(req.params.id)
            //console.log(data);
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    ManagerInfoByID: async (req, res) => {
        try {
            
            const data = await GenericModel.ManagerMetaDataByID(req.params.id)
            //console.log(data);
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    SupplierInfoByID: async (req, res) => {
        try {
            
            const data = await GenericModel.SupplierMetaDataByID(req.params.id)
            //console.log(data);
            return res.status(200).json({
                result: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
}