require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(bodyParser.json());

//routes
const SupplierRoutes = require('./api/routes/Supplier')

//supplier
app.use('/supplier', SupplierRoutes)


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