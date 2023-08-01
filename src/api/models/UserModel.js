const pool = require('./DataBase')
const crypto = require('crypto')
const passwordUtils = require('../helpers/PasswordUtils')
const notify = require('../helpers/NotifyUtils')
const { sign } = require('jsonwebtoken')



const forgetPasswordLinkTemplate = require('../emailTemplate/User/ForgotPasswordLink')



module.exports = {

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
                            //console.log(obj);
                            const user_jwt = sign({ result: obj }, process.env.ACCESS_TOKEN_KEY
                                ,
                                {
                                    expiresIn: "1d"
                                }
                            )

                            return resolve({
                                result: {
                                    name: obj.user_first_name + ' ' + obj.user_last_name,
                                    email: obj.user_email,
                                    mobile: obj.user_mobile,
                                    role: obj.user_role,
                                    ID: obj.user_ID,
                                    vendorID: obj.supp_vendor_reg_code,
                                    managerID: obj.manager_ID,
                                    permission: JSON.parse(obj.Permission_ID),
                                    user_token: user_jwt
                                },
                                message: 'User authenticated successfully'
                            })
                        }
                        return resolve({
                            result: -1,
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
                                result: -1,
                                message: 'Invalid username'
                            })

                        }
                        return resolve({
                            result: results[0][0],
                            message: 'User found'
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
                                message: 'Password changed successfully'
                            })
                        }
                    )
                })
            }
            else {
                return resolve({
                    message: 'Password mismatched'
                })
            }
        })
    },

    sendForgetPasswordLink: (data) => {

        var token = crypto.randomBytes(125).toString('hex');
        //console.log(token,data);
        return new Promise((resolve, reject) => {

            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_set_reset_password_token(?, ?);',
                    [data.user_email.toLowerCase(), token],
                    (error, results) => {
                        if (error) return reject(error)

                        conn.destroy()

                        notify.sendMAIL(
                            'Verification',
                            [{ name: data.user_first_name, address: data.user_email }],
                            forgetPasswordLinkTemplate.getSubject(),
                            null,
                            forgetPasswordLinkTemplate.getTEXTMailTemplate(data.user_first_name, token)
                        )
                        return resolve({
                            message: 'Password reset link sent'
                        })
                    }
                )
            })
        })
    },

    getDataFromToken: (token) => {
        return new Promise((resolve, reject) => {

            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_reset_password_token(?);',
                    [token],
                    (error, results) => {
                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0].length <= 0) {
                            // user dosenot exist
                            return resolve({
                                result: -1,
                                message: 'Token invalid or expired'
                            })

                        }
                        return resolve({
                            result: results[0][0],
                            message: 'User found'
                        })
                    }
                )
            })

        })
    },

    forgotPassword: (newPWD, user_id) => {
        return new Promise((resolve, reject) => {

            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_change_user_password(?,?);',
                    [user_id, passwordUtils.hashPassword(newPWD)],
                    (error, uselessCB) => {
                        if (error) return reject(error)

                        conn.destroy()
                        return resolve({
                            message: 'Password changed successfully'
                        })
                    }
                )
            })
        })
    },
}
