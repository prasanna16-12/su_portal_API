const express = require('express')
const UserRouter = express.Router()
const UserController = require('../controllers/UserController')

/* validation */
const validateUserBasicData = require('../middlewares/validation/User/addUserValidation')
const validateUserLoginData = require('../middlewares/validation/User/loginUserValidation')
const validatePasswordResetData = require('../middlewares/validation/User/changePasswordValidation')
const verifyAdminToken = require('../middlewares/authorization/adminTokenValidation')

UserRouter
    /* add new user */
    .post('/addUser', validateUserBasicData, verifyAdminToken, UserController.createNewUser)
    .get('/login', validateUserLoginData, UserController.loginUser)
    .post('/changePassword', validatePasswordResetData, UserController.changePassword)


module.exports = UserRouter