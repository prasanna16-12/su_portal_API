const pool = require("./DataBase");

module.exports = {
  insertMatrialMasterData: (data, createdBy) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_insert_material_master_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.description,
            data.UoM,
            data.material_group,
            data.material_type,
            data.conversion_factor,
            data.WH_location,
            data.rate,
            data.batch,
            data.ERP_no,
            data.manufacturer_no,
            data.HSN_code,
            data.specification,
            data.assembly,
            data.base_material,
            createdBy,
          ],
          (error, result) => {
            console.log();
            if (error) {
              return reject(error);
            }
            conn.destroy();
            //console.log(result);
            return resolve(result[0]);
          }
        );
      });
    });
  },
};
