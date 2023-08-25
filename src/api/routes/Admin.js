const express = require('express')
const AdminRouter = express.Router()
const AdminController = require('../controllers/AdminController')

/* validation */

const validateNewUserBasicData = require('../middlewares/validation/addUserValidation')
const validateUpdateUserBasicData = require('../middlewares/validation/updateUserValidation')


AdminRouter
    /* add new user */
    .post('/user', validateNewUserBasicData, AdminController.createNewUser)

    /* get all users */
    .get('/user', AdminController.getAllUsers)

    /* update */
    .put('/user', validateUpdateUserBasicData, AdminController.updateUser)

    /* get all user meta data */
    .get('/usermetadata', AdminController.userMetaData)

    /* get all user meta data */
    .get('/rolemetadata', AdminController.roleMetaData)

module.exports = AdminRouter