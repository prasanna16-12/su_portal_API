const express = require('express')
const UserRouter = express.Router()
const UserController = require('../controllers/UserController')

/* validation */
const validateUserBasicData = require('../middlewares/validation/User/addUserValidation')
const validateUserLoginData = require('../middlewares/validation/User/loginUserValidation')
const checkToken = require('../middlewares/authorization/tokenValidation')

UserRouter
    /* add new user */
    .post('/addUser', validateUserBasicData, checkToken,UserController.createNewUser)
    .get('/login', validateUserLoginData, UserController.loginUser)


module.exports = UserRouter