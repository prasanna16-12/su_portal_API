const express = require('express')
const SupplierRouter = express.Router()
const SupplierController = require('../controllers/SupplierController')
const validateSupplierBasicData = require('../middlewares/validation/SupplierBasicDataValidation')
const optDataValidation = require('../middlewares/validation/NewOTPValidation')
const authValidation = require('../middlewares/validation/SupplierAuthValidation')



SupplierRouter
    .post('/', validateSupplierBasicData, SupplierController.addSupplier)
    .get('/AllSupplier', SupplierController.allSupplier)
    .get('/NewOTP', optDataValidation, SupplierController.newOTP)
    .get('/AuthenticateSupplier', authValidation, SupplierController.authenticateSupplier)


module.exports = SupplierRouter