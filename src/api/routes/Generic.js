const express = require('express')
const GenericRouter = express.Router()
const BuyerController = require('../controllers/BuyerController')

/* validation */
const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')

GenericRouter
    /* get pending approvals */
    .get('/Approve', BuyerController.allPendingApproval)
    
module.exports = GenericRouter