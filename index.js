require('dotenv').config()

//const pool = require('./src/api/models/DataBase')

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

//supplier
app.use('/supplier', SupplierRoutes)

//test
// app.get('/test', (req, res) => {
//     pool.getConnection((error, conn) => {
//         if (error) return reject(error)
//         conn.query(
//             'select * from tbl_status_mapping;',

//             (error, results) => {

//                 if (error) return res.status(500).json(error)

//                 conn.destroy()
//                 console.log(results);
//                 return res.status(500).json(results)
//             }
//         )
//     })
// })

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