
const sqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSSWORD,
    database: process.env.DATABASE,
    //port: 3360,
    connectionLimit: 10
}

module.exports = sqlConfig