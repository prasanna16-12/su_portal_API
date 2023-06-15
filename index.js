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

//routes
const SupplierRoutes = require('./src/api/routes/Supplier')
const BuyerRoutes = require('./src/api/routes/Buyer')
const UserRoutes = require('./src/api/routes/User')

//supplier
app.use('/supplier', SupplierRoutes)

//Buyer
app.use('/Buyer', BuyerRoutes)

//login
app.use('/User', UserRoutes)

app.all('*', (req, res) => {
    const err = new Error(`Requested url ${req.url} not found`)
    res.status(404).json({
        success: 0,
        message: err.message,
        stack: err.stack
    })
})


//staring server
app.listen(PORT, () => {
    console.log(`App is running ${PORT}`)
})