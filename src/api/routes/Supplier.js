const express = require('express')
const SupplierRouter = express.Router()
const SupplierController = require('../controllers/SupplierController')
const validateSupplierBasicData = require('../middlewares/validation/SupplierBasicDataValidation')
const optDataValidation = require('../middlewares/validation/NewOTPValidation')
const authValidation = require('../middlewares/validation/SupplierAuthValidation')
const supplierCompDetailValidation = require('../middlewares/validation/SupplierCompDetailsValidation')
const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')
const SupplierInternalDataValidation = require('../middlewares/validation/SupplierInternalDataValidation')



SupplierRouter
    .post('/', validateSupplierBasicData, SupplierController.addSupplier)
    .get('/AllSupplier', SupplierController.allSupplier)
    .get('/NewOTP', optDataValidation, SupplierController.newOTP)
    .get('/AuthenticateSupplier', authValidation, SupplierController.authenticateSupplier)
    .post('/AddSupplierDetails', supplierCompDetailValidation, SupplierController.addSupplierCompDetails)
    .get('/AllPendingApprovals', SupplierController.allPendingApproval)
    .post('/StatusChangeAP1', StatusChangeValidation, SupplierController.changeStatus)
    .post('/StatusChangeAP2', StatusChangeValidation, SupplierController.changeStatus)
    .post('/StatusChangeID1', SupplierInternalDataValidation, SupplierController.changeStatusID1)
    .post('/StatusChangeAP3', StatusChangeValidation, SupplierController.changeStatus)



module.exports = SupplierRouter