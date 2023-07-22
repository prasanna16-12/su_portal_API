const BuyerModel = require('../models/BuyerModel')

module.exports = {

    getUpdateDetails: async (req, res) => {
        try {
            const data = await BuyerModel.getUpdateDetailsStaggingTable(req.params.id)
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

    approveUpdateDetails: async (req, res) => {
        try {
            const data = await BuyerModel.approveUpdateDetailsMasterTable(req.params.id)
            return res.status(200).json({
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    addContactPerson: async (req, res) => {
        try {
            const ID = await BuyerModel.addContactPerson(req.body)
            return res.status(201).json({
                result: {'supplier_ID':ID},
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    
    CompanyDetails: async (req, res) => {
        try {
            const companyDetails = await BuyerModel.CompanyDetails(req.params.id)
            //console.log(supplierList)
            const data = await BuyerModel.allPendingApprovalWithPrevStatus(companyDetails)

            return res.status(200).json({
                result: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },


    allPendingApproval: async (req, res) => {
        try {
            const supplierList = await BuyerModel.allPendingApproval()
            console.log(supplierList)
            const data = await BuyerModel.allPendingApprovalWithPrevStatus(supplierList)

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


    changeStatus: async (req, res) => {
        try {
            let action = "AP1"
            console.log(action);
            const data = await BuyerModel.changeStatus(req, action)
            return res.status(200).json({
                result: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    changeStatusID1: async (req, res) => {
        try {
            //console.log(req.user_info);
            const data = await BuyerModel.changeStatusID1(req)
            return res.status(200).json({
                result: data[0],
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    fileUpload_NDA: async (req, res) => {
        try {
            //store file path in database
            const filePath = path.resolve(__dirname, '../../../', req.file.path)
            console.log(filePath);
            console.log(req.file);
            await BuyerModel.addNDAfile(req.params.id, filePath, req.file)


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
            const file = await BuyerModel.getNDAfile(req.params.id)
            console.log(file);
            const filePath = file[0].file_path
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