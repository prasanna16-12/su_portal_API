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
                result: -1,
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
                result: -1,
                message: error.message
            })
        }
    },
}