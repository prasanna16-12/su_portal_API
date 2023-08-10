const ManagerModel = require('../models/ManagerModel')

module.exports = {

    
    changeStatus_AP2: async (req, res) => {
        try {
            let action = "AP2"
            console.log(action);
            const data = await ManagerModel.changeStatus(req, action)
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

    changeStatus_AP3: async (req, res) => {
        try {
            let action = "AP3"
            console.log(action);
            const data = await ManagerModel.changeStatus(req, action)
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

    updateVendorData: async (req, res) => {
        try {
            const data = await ManagerModel.updateVendorData(req)
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