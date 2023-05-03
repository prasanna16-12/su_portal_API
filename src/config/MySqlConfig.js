
const sqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    connectionLimit: 10
}

module.exports = sqlConfig