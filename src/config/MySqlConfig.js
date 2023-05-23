
const sqlConfigProd = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    connectionLimit: 10
}

const sqlConfigLocal = {
    host: process.env.L_HOST,
    user: process.env.L_USER,
    password: process.env.L_PASSSWORD,
    database: process.env.L_DATABASE,
    port: process.env.L_DBPORT,
    connectionLimit: 10
}

module.exports = sqlConfigProd