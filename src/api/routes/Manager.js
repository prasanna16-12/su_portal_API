const express = require('express')
const ManagerRouter = express.Router()
const ManagerController = require('../controllers/ManagerController')
const BuyerController = require('../controllers/BuyerController')

/* validation */
const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')

ManagerRouter
    /* get pending approvals */
    .get('/Approve', BuyerController.allPendingApproval)
    
    /* approve status to AP1 */
    .put('/Approve/AP2', StatusChangeValidation, ManagerController.changeStatus_AP2)

    /* approve status to ID1 */
    .put('/Approve/AP3', StatusChangeValidation, ManagerController.changeStatus_AP3)

module.exports = ManagerRouter