require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 5000

// middleware
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))


const verifyBuyerToken = require('./src/api/middlewares/authorization/buyerTokenValidation')
const verifyAdminToken = require('./src/api/middlewares/authorization/adminTokenValidation')
const verifySupplierToken = require('./src/api/middlewares/authorization/supplierTokenValidation')
const verifyManagerToken = require('./src/api/middlewares/authorization/managerTokenValidation')

//routes
const SupplierRoutes = require('./src/api/routes/Supplier')
const BuyerRoutes = require('./src/api/routes/Buyer')
const UserRoutes = require('./src/api/routes/User')
const ContactPersonRoutes = require('./src/api/routes/ContactPerson')
const AdminRoutes = require('./src/api/routes/Admin')
const ManagerRoutes = require('./src/api/routes/Manager')

//supplier
app.use('/Supplier', verifySupplierToken, SupplierRoutes)

//Buyer
app.use('/Buyer', verifyBuyerToken, BuyerRoutes)

//login
app.use('/User', UserRoutes)

//contact person
app.use('/ContactPerson', ContactPersonRoutes)

//admin
app.use('/Admin', verifyAdminToken,AdminRoutes)

//manager
app.use('/Manager', verifyManagerToken, ManagerRoutes)



app.all('*', (req, res) => {
    const err = new Error(`Requested url ${req.url} not found`)
    res.status(404).json({
        success: 0,
        message: err.message
    })
})


//staring server
app.listen(PORT, () => {
    console.log(`App is running ${PORT}`)
})