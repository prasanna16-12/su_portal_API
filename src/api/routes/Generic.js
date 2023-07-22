const express = require('express')
const GenericRouter = express.Router()
const BuyerController = require('../controllers/BuyerController')

/* validation */

const tokenCheckAuth = require('../middlewares/authorization/checkToken')

GenericRouter
    /* get pending approvals */
    .get('/Approve', BuyerController.allPendingApproval)

    /* check token validation */
    .get('/checkToken/:email',tokenCheckAuth)

    /* get company details */
    .get('/SupplierCompany/:id', BuyerController.CompanyDetails)

    
module.exports = GenericRouter