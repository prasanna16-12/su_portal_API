const express = require('express')
const BuyerRouter = express.Router()
const BuyerController = require('../controllers/BuyerController')

/* validation */

BuyerRouter
    /* get supplier details (pending for approval) */
    .post('/getUpdatedSupplierDetails/:id', BuyerController.getUpdateDetails)

    /* add approved fields */
    .post('/approveUpdateField/:id', BuyerController.approveUpdateDetails)

module.exports = BuyerRouter