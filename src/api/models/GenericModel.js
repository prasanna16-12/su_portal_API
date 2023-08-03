const pool = require('./DataBase')

module.exports = {

    VendorMetaData:()=>{
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query('CALL usp_get_vendor_metadata;',
                    (error, result)=>{
                        if(error) return reject(error)

                        conn.destroy()
                        //console.log(result);
                        return resolve(result[0])
                    }
                )
            })
        })
    }
}
