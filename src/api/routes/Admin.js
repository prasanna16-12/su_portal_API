const express = require('express')
const AdminRouter = express.Router()
const AdminController = require('../controllers/AdminController')

/* validation */
const verifyAdminToken = require('../middlewares/authorization/adminTokenValidation')
const validateNewUserBasicData = require('../middlewares/validation/addUserValidation')
const validateUpdateUserBasicData = require('../middlewares/validation/updateUserValidation')


AdminRouter
    /* add new user */
    .post('/user', verifyAdminToken, validateNewUserBasicData, AdminController.createNewUser)

    /* get all users */
    .get('/user', verifyAdminToken, AdminController.getAllUsers)

    /* update */
    .put('/user', verifyAdminToken, validateUpdateUserBasicData, AdminController.updateUser)

    /* get all manager and vendor meta data */
    .get('/managervendorinfo', verifyAdminToken, AdminController.managerVendorInfo)


module.exports = AdminRouter