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

    getUpdateDetails: async (req, res) => {
        try {
            const data = await ManagerModel.getPendingUpdateForManager(req.params.id)

            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                delete data[i]['approvedOn']
            }


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