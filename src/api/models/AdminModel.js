const pool = require('./DataBase')
const passwordUtils = require('../helpers/PasswordUtils')
const notify = require('../helpers/NotifyUtils')
const { sign } = require('jsonwebtoken')

module.exports = {


    createNewUser: (req) => {
        const password = passwordUtils.randomPassword()

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_create_user(?,?,?,?,?,?,?,?);',
                    [req.first_name, req.email.toLowerCase(), req.mobile, req.role, passwordUtils.hashPassword(password), req.last_name, req.vendor_reg_code, req.manager_ID],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0][0].ID != -1) {
                            notify.sendOTP(req.mobile, `Password is ${password}, Username is ${req.email}`)
                        }

                        //console.log(results[0]);
                        return resolve(results[0])
                    }
                )
            })

        })
    },


}
