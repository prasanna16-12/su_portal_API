const express = require('express')
const ManagerRouter = express.Router()
const ManagerController = require('../controllers/ManagerController')
const BuyerController = require('../controllers/BuyerController')

/* validation */
const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')
const vendorUpdateDetails = require('../middlewares/validation/VendorDetailsValidation')

ManagerRouter
    /* approve status to AP1 */
    .put('/Approve/AP2', StatusChangeValidation, ManagerController.changeStatus_AP2)

    /* approve status to ID1 */
    .put('/Approve/AP3', StatusChangeValidation, ManagerController.changeStatus_AP3)

    /* get supplier update details (pending for approval) using manager ID*/
    .get('/Update/:id', BuyerController.getUpdateDetails)

    /* add approved update fields using update ID*/
    .post('/Update/approve/:id', BuyerController.approveUpdateDetails)

    /* add reject update fields using update ID*/
    .post('/Update/reject/:id', BuyerController.rejectUpdateDetails)

    /* manager to update vendor data without approval*/
    .put('/Update/vendor', vendorUpdateDetails, ManagerController.updateVendorData) // pending

    /* manager to update buyer data without approval*/
    //.put('/Update/buyer', BuyerController.rejectUpdateDetails) // pending

module.exports = ManagerRouter