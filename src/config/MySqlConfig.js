require('dotenv').config()

const sqlConfigProd = {
    host: process.env.P_HOST,
    user: process.env.P_USER,
    password: process.env.P_PASSSWORD,
    database: process.env.P_DATABASE,
    port: process.env.P_DBPORT,
    connectionLimit: 10
}

//console.log(sqlConfigProd);

const sqlConfigLocal = {
    host: process.env.L_HOST,
    user: process.env.L_USER,
    password: process.env.L_PASSSWORD,
    database: process.env.L_DATABASE,
    port: process.env.L_DBPORT,
    connectionLimit: 10
}

module.exports = sqlConfigProd