const pool = require('./DataBase')

module.exports = {

    changeStatus: (data, action) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_change_status_AP1_AP2_AP3(?, ?, ?);',
                    [data.supp_reg_code, action],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },
}