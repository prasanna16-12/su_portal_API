const express = require('express')
const UserRouter = express.Router()
const UserController = require('../controllers/UserController')

/* validation */
const validateUserLoginData = require('../middlewares/validation/loginUserValidation')
const validatePasswordResetData = require('../middlewares/validation/changePasswordValidation')

UserRouter

    /* login */
    .post('/Login', validateUserLoginData, UserController.loginUser)
    
    /* change password */
    .put('/ChangePassword', validatePasswordResetData, UserController.changePassword)


module.exports = UserRouter