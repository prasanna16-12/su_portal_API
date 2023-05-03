const connectionConfig = require('../../config/MySqlConfig')
const MYSQL = require('mysql')

const con = MYSQL.createPool(connectionConfig)

module.exports = con