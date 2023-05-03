const pool = require('./DataBase')
const verification = require('../helpers/Verification')

module.exports = {

    addSupplier: (data) => {
        return new Promise((resolve, reject) => {
            let { name, email, phone } = data
            let OTP = Math.floor(Math.random() * 9000) + 1000
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_create_supplier(?,?,?,?)',
                    [name, email, phone, OTP],
                    (error, results) => {

                        if (error) return reject(error)
                        // otp verification
                        verification.sendOTP(OTP, results[0][0].supp_name, results[0][0].supp_mobile, results[0][0].OTP_validity_TS)

                        // email
                        //verification.sendMAIL(results[0][0].supp_name, results[0][0].supp_email, results[0][0].supp_ID)
                        conn.destroy()
                        return resolve(results[0][0].supp_ID)
                    }
                )
            })

        })
    },

    allSupplier: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_all_supplier();',
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    newOTP: (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                let OTP = Math.floor(Math.random() * 9000) + 1000
                conn.query(
                    'CALL usp_get_newOTP(?,?);',
                    [data.Supplier_ID, OTP],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()

                        // otp verification
                        verification.sendOTP(OTP, results[0][0].supp_name, results[0][0].supp_mobile, results[0][0].OTP_validity_TS)

                        return resolve(OTP)
                    }
                )
            })

        })
    },

    authenticateSupplier: (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_authenticate_supplier(?, ?);',
                    [data.Supplier_ID, data.OTP],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        console.log(results);
                        return resolve(results[0].length > 0)
                    }
                )
            })

        })
    }


}