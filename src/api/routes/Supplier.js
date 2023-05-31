const express = require('express')
const SupplierRouter = express.Router()
const SupplierController = require('../controllers/SupplierController')

/* validation */
const validateSupplierBasicData = require('../middlewares/validation/supplier/SupplierBasicDataValidation')
const optDataValidation = require('../middlewares/validation/supplier/NewOTPValidation')
const authValidation = require('../middlewares/validation/supplier/SupplierAuthValidation')
const supplierCompDetailValidation = require('../middlewares/validation/supplier/SupplierCompDetailsValidation')
const StatusChangeValidation = require('../middlewares/validation/supplier/StatusChangeValidation')
const SupplierInternalDataValidation = require('../middlewares/validation/supplier/SupplierInternalDataValidation')
const vendorRegCodeDataValidation = require('../middlewares/validation/supplier/VendorRegCodeDataValidation')
const supplierUpdatedDetails = require('../middlewares/validation/supplier/UpdateDetailsValidation')

const NDA_Upload = require('../middlewares/fileUpload/NDA_Upload')

SupplierRouter

    /* Add supplier with basic details */
    .post('/', validateSupplierBasicData, SupplierController.addSupplier)

    /* return all supplier with basic data
    {
        "supp_name": "prasanna kale",
        "supp_email": "prasanna@yopmail.com",
        "supp_mobile": "+917028811590"
    }*/
    .get('/AllSupplier', SupplierController.allSupplier)

    /* Generate new otp
    {
        "Supplier_ID" : 1000000009
    }
    */
    .get('/NewOTP', optDataValidation, SupplierController.newOTP)

    
    .get('/AuthenticateSupplier', authValidation, SupplierController.authenticateSupplier)
    .post('/AddSupplierDetails', supplierCompDetailValidation, SupplierController.addSupplierCompDetails)
    .get('/AllPendingApprovals', SupplierController.allPendingApproval)
    .post('/StatusChangeAP1', StatusChangeValidation, SupplierController.changeStatus)
    .post('/StatusChangeAP2', StatusChangeValidation, SupplierController.changeStatus)
    .post('/StatusChangeID1', SupplierInternalDataValidation, SupplierController.changeStatusID1)
    .post('/StatusChangeAP3', StatusChangeValidation, SupplierController.changeStatus)
    .get('/SupplierCompanyDetails', vendorRegCodeDataValidation, SupplierController.supplierCompanyDetails)
    .post('/NDA_Upload/:id',NDA_Upload.single('uploadedFile') ,SupplierController.fileUpload_NDA)
    .get('/NDA_Download/:id', SupplierController.fileDownload_NDA)

    /* get details to be updated and insert it into -> tbl_supplier_details_update */
    .post('/UpdatedSupplierDetails/', supplierUpdatedDetails, SupplierController.addUpdateDetails)
    .get('/UpdatedSupplierDetails/:id', SupplierController.getUpdateDetails)


module.exports = SupplierRouter