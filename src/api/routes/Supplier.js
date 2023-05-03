const express = require('express')
const SupplierRouter = express.Router()
const SupplierController = require('../controllers/SupplierController')
const validateSupplierBasicData = require('../middlewares/Validation')


SupplierRouter
    .post('/', validateSupplierBasicData, SupplierController.addSupplier)
    .get('/', SupplierController.newOTP)


module.exports = SupplierRouter