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
                    [req.first_name, req.email, req.mobile, req.role, passwordUtils.hashPassword(password), req.last_name, req.vendor_reg_code, req.manager_ID],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0][0].ID != -1) {
                            notify.sendOTP(req.mobile, password)
                        }
                        
                        console.log(results[0]);
                        return resolve(results[0])
                    }
                )
            })

        })
    },


    loginUser: (req) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_user_details(?);',
                    [req.email],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0].length <= 0) {
                            // user dosenot exist
                            return resolve({
                                data: -1,
                                message: 'Invalid username'
                            })
                        }
                        console.log(results[0], req);
                        const isPassWordCorrect = passwordUtils.comparePassword(req.password, results[0][0].user_password)
                        if (isPassWordCorrect) {
                            let obj = results[0][0]
                            obj.user_password = undefined
                            const jwt = sign({ result: obj }, process.env.KEY, {
                                expiresIn: "1h"
                            })
                            return resolve({
                                data: {
                                    name: obj.user_first_name + ' ' + obj.user_last_name,
                                    email: obj.user_email,
                                    mobile: obj.user_mobile,
                                    role: obj.user_role,
                                    user_token: jwt
                                },
                                message: 'User authenticated successfully'
                            })
                        }
                        return resolve({
                            data: -1,
                            message: 'Invalid password'
                        })
                    }
                )
            })

        })
    },
}
