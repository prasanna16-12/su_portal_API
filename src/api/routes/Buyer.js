const express = require('express')
const BuyerRouter = express.Router()
const BuyerController = require('../controllers/BuyerController')

/* validation */
const validateContactPersonBasicData = require('../middlewares/validation/ContactPersonBasicDataValidation')

const StatusChangeValidation = require('../middlewares/validation/StatusChangeValidation')
const SupplierInternalDataValidation = require('../middlewares/validation/SupplierInternalDataValidation')
const vendorRegCodeDataValidation = require('../middlewares/validation/VendorRegCodeDataValidation')
const NDA_Upload = require('../middlewares/fileUpload/NDA_Upload')

BuyerRouter
    /* get supplier update details (pending for approval) */
    .get('/Update/:id', BuyerController.getUpdateDetails)

    /* add approved update fields */
    .post('/Update/:id', BuyerController.approveUpdateDetails)

    /* Add contact person with basic details */
    .post('/ContactPerson', validateContactPersonBasicData, BuyerController.addContactPerson)

    /* approve status to AP1 */
    .put('/Approve/AP1', StatusChangeValidation, BuyerController.changeStatus)

    /* approve status to ID1 */
    .put('/Approve/ID1', SupplierInternalDataValidation, BuyerController.changeStatusID1)

    /* get company details */
    // .get('/SupplierCompany/:id', BuyerController.CompanyDetails)   -> moved to generic

    /* upload NDA */
    .post('/NDA_document/:id', NDA_Upload.single('uploadedFile'), BuyerController.fileUpload_NDA)

    /* download NDA */
    .get('/NDA_document/:id', BuyerController.fileDownload_NDA)


module.exports = BuyerRouter