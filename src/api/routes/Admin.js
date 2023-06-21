const express = require('express')
const AdminRouter = express.Router()
const AdminController = require('../controllers/AdminController')

/* validation */
const verifyAdminToken = require('../middlewares/authorization/adminTokenValidation')
const validateNewUserBasicData = require('../middlewares/validation/addUserValidation')

AdminRouter
    /* add new user */
    .post('/user', validateNewUserBasicData, verifyAdminToken, AdminController.createNewUser)
    
    /* get all users */ // pending
    .get('/user', verifyAdminToken ,AdminController.createNewUser)


module.exports = AdminRouter