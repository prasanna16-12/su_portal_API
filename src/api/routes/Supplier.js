const express = require('express')
const SupplierRouter = express.Router()
const SupplierController = require('../controllers/SupplierController')

/* validation */
const supplierUpdatedDetailsValidation = require('../middlewares/validation/UpdateDetailsValidation')



SupplierRouter

    /* updated and insert details into -> tbl_supplier_details_update */
    .put('/Update', supplierUpdatedDetailsValidation, SupplierController.addUpdateDetails)

module.exports = SupplierRouter