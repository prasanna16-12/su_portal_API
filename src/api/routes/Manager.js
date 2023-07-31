const express = require('express')
const ManagerRouter = express.Router()
const ManagerController = require('../controllers/ManagerController')
const BuyerController = require('../controllers/BuyerController')

/* validation */
const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')

ManagerRouter
    /* approve status to AP1 */
    .put('/Approve/AP2', StatusChangeValidation, ManagerController.changeStatus_AP2)

    /* approve status to ID1 */
    .put('/Approve/AP3', StatusChangeValidation, ManagerController.changeStatus_AP3)

    /* get supplier update details (pending for approval) */
    .get('/Update/:id', ManagerController.getUpdateDetails)

    /* add approved update fields */
    .post('/Update/approve/:id', BuyerController.approveUpdateDetails)

    /* add reject update fields */
    .post('/Update/reject/:id', BuyerController.rejectUpdateDetails)

module.exports = ManagerRouter