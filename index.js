require('dotenv').config()

const pool = require('./src/api/models/DataBase')
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
const verifyToken = require('./src/api/middlewares/authorization/TokenValidation')

//routes
const SupplierRoutes = require('./src/api/routes/Supplier')
const BuyerRoutes = require('./src/api/routes/Buyer')
const UserRoutes = require('./src/api/routes/User')
const ContactPersonRoutes = require('./src/api/routes/ContactPerson')
const AdminRoutes = require('./src/api/routes/Admin')
const ManagerRoutes = require('./src/api/routes/Manager')
const GenericRoutes = require('./src/api/routes/Generic')

//supplier
app.use('/api/Supplier', verifySupplierToken, SupplierRoutes)

//Buyer
app.use('/api/Buyer', verifyBuyerToken, BuyerRoutes)

//user
app.use('/api/User', UserRoutes)

//contact person
app.use('/api/ContactPerson', ContactPersonRoutes)

//admin
app.use('/api/Admin', verifyAdminToken, AdminRoutes)

//manager
app.use('/api/Manager', verifyManagerToken, ManagerRoutes)


//generic (admin-manager-supplier)
app.use('/api/Generic', verifyToken, GenericRoutes)


app.get('/api/sql/test',(req, res)=>{
    console.log(req.body.query);
    pool.getConnection((error, conn) => {
        if (error) return reject(error)
        conn.query(
            req.body.query,
            (error, results) => {

                if (error) return res.json(error)

                conn.destroy()
                return res.json(results)
            }
        )
    })
})


app.all('*', (req, res) => {
    const err = new Error(`Requested url ${req.url} not found`)
    res.status(404).json({
        message: err.message
    })
})


//staring server
app.listen(PORT, () => {
    console.log(`App is running ${PORT}`)
})