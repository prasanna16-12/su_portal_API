const connectionConfig = require("../../config/MySqlConfig");
const MYSQL = require("mysql2");

const con = MYSQL.createPool(connectionConfig);

module.exports = con;
