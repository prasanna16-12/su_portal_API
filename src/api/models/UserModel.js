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


    loginUser: (req) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_user_details(?);',
                    [req.email.toLowerCase()],
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
                        //console.log(results[0], req);
                        const isPassWordCorrect = passwordUtils.comparePassword(req.password, results[0][0].user_password)
                        if (isPassWordCorrect) {
                            let obj = results[0][0]
                            obj.user_password = undefined

                            const user_jwt = sign({ result: obj }, process.env.ACCESS_TOKEN_KEY
                                ,
                                {
                                    expiresIn: "1d"
                                }
                            )

                            //notify.sendMAIL('prasanna89kale@gmail.com', 'prasanna89kale@gmail.com', '', '');

                            return resolve({
                                data: {
                                    name: obj.user_first_name + ' ' + obj.user_last_name,
                                    email: obj.user_email,
                                    mobile: obj.user_mobile,
                                    role: obj.user_role,
                                    user_token: user_jwt
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


    getUserData: (req) => {
        return new Promise((resolve, reject) => {

            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_user_details(?);',
                    [req.email.toLowerCase()],
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
                        return resolve({
                            data: 1,
                            message: results[0][0]
                        })
                    }
                )
            })

        })
    },
    changePassword: (user, body) => {
        return new Promise((resolve, reject) => {
            const isPassWordCorrect = passwordUtils.comparePassword(body.old_password, user.user_password)
            //console.log(body.old_password, user.user_password, isPassWordCorrect);

            if (isPassWordCorrect) {
                // change password
                pool.getConnection((error, conn) => {
                    if (error) return reject(error)
                    conn.query(
                        'CALL usp_change_user_password(?,?);',
                        [user.user_ID, passwordUtils.hashPassword(body.new_password)],
                        (error, uselessCB) => {
                            if (error) return reject(error)

                            conn.destroy()
                            return resolve({
                                data: 1,
                                message: 'Password changed successfully'
                            })
                        }
                    )
                })
            }
            else {
                return resolve({
                    data: -1,
                    message: 'Password mismatched'
                })
            }
        })
    },

}
