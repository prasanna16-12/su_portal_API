const pool = require("./DataBase");

module.exports = {
  insertMatrialMasterData: (data, createdBy) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_insert_material_master_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.description,
            data.unit_of_measure,
            data.material_group,
            data.material_type,
            data.conversion_factor,
            data.warehouse_location,
            data.rate,
            data.ERP_no,
            data.manufacturer_no,
            data.HSN_code,
            data.specification,
            data.assembly,
            data.base_material,
            createdBy,
            data.batch_managed,
            data.currency,
            data.serialised,
            false, // is bulk upload is set to false when uploaded through UI
            data.conversion_factor_to,
            data.conversion_factor_from_value,
            data.conversion_factor_to_value,
          ],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            return resolve(result[0]);
          }
        );
      });
    });
  },
};
