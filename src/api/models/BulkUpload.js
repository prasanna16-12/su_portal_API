const pool = require("./DataBase");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const validateMaterialMaster = require("../middlewares/validation/BulkMaterialMasterDataValidation");

module.exports = {
  validateMaterialMasterFile: async (file) => {
    let sheetProcessingLog = [];
    let workbook = XLSX.readFile(file.path);
    let sheet_name_list = workbook.SheetNames;

    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    //console.log(xlData);
    for (let index = 0; index < xlData.length; index++) {
      const row = xlData[index];
      let validation = await validateMaterialMaster(row);
      sheetProcessingLog.push({
        row,
        processingStatus: validation,
      });
    }

    //console.log(sheetProcessingLog);
    //delete file
    return sheetProcessingLog;
  },

  MaterialMasterBulkDataDuplicateCheck: (obj) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call validate_material_master(?);",
          [obj.ERP_no],
          (error, results) => {
            if (error) return reject(error);
            conn.destroy();
            return resolve(results[0][0]);
          }
        );
      });
    });
  },
};
