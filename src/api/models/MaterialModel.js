const pool = require("./DataBase");

module.exports = {
  insertMatrialMasterData: (data, createdBy) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_insert_material_master_data( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.description,
            data.unit_of_measure,
            data.material_group,
            data.material_type,
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
            true, // is active to true,
            data.rate_UOM,
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

  updateMatrialMasterData: (materialID, data, modifiedBy) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        console.log(materialID, data, modifiedBy);
        conn.query(
          "CALL usp_material_master_details_direct_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            materialID,
            data.description,
            data.unit_of_measure,
            data.material_group,
            data.material_type,
            data.warehouse_location,
            data.rate,
            data.ERP_no,
            data.manufacturer_no,
            data.HSN_code,
            data.specification,
            data.assembly,
            data.base_material,
            modifiedBy,
            data.batch_managed,
            data.currency,
            data.serialised,
            data.conversion_factor_to,
            data.conversion_factor_from_value,
            data.conversion_factor_to_value,
            data.is_active,
            data.rate_UOM,
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
