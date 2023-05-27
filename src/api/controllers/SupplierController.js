
const { string } = require('joi')
const path = require('path');
const SupplierModel = require('../models/SupplierModel')

module.exports = {

    addSupplier: async (req, res) => {
        try {
            const ID = await SupplierModel.addSupplier(req.body)
            return res.status(200).json({
                supplier_ID: ID,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                supplier_ID: -1,
                message: error.message
            })
        }
    },
    allSupplier: async (req, res) => {
        try {
            const supplierList = await SupplierModel.allSupplier()
            console.log(supplierList)
            return res.status(200).json({
                supplier_data: supplierList,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                supplier_data: -1,
                message: error.message
            })
        }
    },

    authenticateSupplier: async (req, res) => {
        try {
            const authStatus = await SupplierModel.authenticateSupplier(req.body)
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
            const status = await SupplierModel.newOTP(req.body)
            return res.status(200).json({
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    addSupplierCompDetails: async (req, res) => {
        try {
            const data = await SupplierModel.addSupplierCompDetails(req.body)
            return res.status(200).json({
                SupplierData: data[0][0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                SupplierData: -1,
                message: error.message
            })
        }
    },


    allPendingApproval: async (req, res) => {
        try {
            const supplierList = await SupplierModel.allPendingApproval()
            //console.log(supplierList)
            const data = await SupplierModel.allPendingApprovalWithPrevStatus(supplierList)

            return res.status(200).json({
                supplier_data: data,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                supplier_data: -1,
                message: error.message
            })
        }
    },

    SupplierCompanyDetails: async (req, res) => {
        try {
            const supplierdetails = await SupplierModel.SupplierCompanyDetails(req.body)
            //console.log(supplierList)
            const data = await SupplierModel.allPendingApprovalWithPrevStatus(supplierdetails)

            return res.status(200).json({
                supplier_data: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                supplier_data: -1,
                message: error.message
            })
        }
    },

    changeStatus: async (req, res) => {
        try {
            let action = null
            if (req.url.toUpperCase().match("AP1") != null) {
                action = "AP1"

            }
            if (req.url.toUpperCase().match("AP2") != null) {
                action = "AP2"

            }
            if (req.url.toUpperCase().match("AP3") != null) {
                action = "AP3"

            }
            console.log(action);
            const data = await SupplierModel.changeStatus(req.body, action)
            return res.status(200).json({
                result: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    changeStatusID1: async (req, res) => {
        try {
            const data = await SupplierModel.changeStatusID1(req.body)
            return res.status(200).json({
                result: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    fileUpload_NDA: async (req, res) => {
        try {
            //store file path in database
            const filePath = path.resolve(__dirname, '../../../', req.file.path)
            console.log(filePath);
            await SupplierModel.addNDAfile(req.params.id, filePath, req.file)


            return res.status(200).json({
                //result: filePath,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },

    fileDownload_NDA: async (req, res) => {
        try {
            //path.resolve(__dirname, '..', '..', '..', 'NDA_Uploads', "")
            var options = {
                root: '',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            }
            const file = await SupplierModel.getNDAfile(req.params.id)
            console.log(file);
            if (file.length > 0) {
                res.sendFile(file[0].file_path, options, function (err) {
                    console.log(err);
                    if (err) {
                        res.status(err.statusCode).json({
                            result: -1,
                            message: 'File Not Found'
                        })
                    }
                })
            }
            else {
                res.status(404).json({
                    result: -1,
                    message: 'File Not Exist'
                })
            }
        } catch (error) {
            return res.status(500).json({
                result: -1,
                message: error.message
            })
        }
    },
}