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
    }

}