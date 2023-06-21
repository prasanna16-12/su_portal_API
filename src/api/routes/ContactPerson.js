const express = require('express')
const ContactPersonRouter = express.Router()
const ContactPersonController = require('../controllers/ContactPersonController')

/* validation */
const validateCompanyData = require('../middlewares/validation/SupplierCompDetailsValidation')
const validatecontactPersonData = require('../middlewares/validation/SupplierAuthValidation')

ContactPersonRouter
    /* add company details */
    .post('/CompanyDetails', validateCompanyData, ContactPersonController.addSupplierCompanyDetails)

    /* authenticate contact person */
    .post('/Verify', validatecontactPersonData, ContactPersonController.authenticateContactPerson)

    

module.exports = ContactPersonRouter