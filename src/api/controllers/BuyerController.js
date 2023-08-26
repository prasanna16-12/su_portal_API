const fs = require("fs");
const path = require("path");
const BuyerModel = require("../models/BuyerModel");
const MaterialModel = require("../models/MaterialModel");
const XLSX = require("xlsx");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const validateMaterialMaster = require("../middlewares/validation/BulkMaterialMasterDataValidation");

module.exports = {
  getUpdateDetails: async (req, res) => {
    try {
      const data = await BuyerModel.getUpdateDetailsStaggingTable(
        req.params.id
      );

      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  approveUpdateDetails: async (req, res) => {
    try {
      const data = await BuyerModel.approveUpdateDetailsMasterTable(
        req.params.id,
        req.user_info.user_ID
      );
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  rejectUpdateDetails: async (req, res) => {
    try {
      const data = await BuyerModel.rejectUpdateDetailsMasterTable(
        req.params.id,
        req.user_info.user_ID
      );
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  addContactPerson: async (req, res) => {
    try {
      const ID = await BuyerModel.addContactPerson(req.body);
      return res.status(201).json({
        result: { supplier_ID: ID },
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  addMaterialMasterData: async (req, res) => {
    try {
      const data = await MaterialModel.insertMatrialMasterData(
        req.body,
        req.user_info.user_ID
      );
      return res.status(201).json({
        result: data[0],
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  CompanyDetails: async (req, res) => {
    try {
      const companyDetails = await BuyerModel.CompanyDetails(req.params.id);
      //console.log(supplierList)
      const data = await BuyerModel.allPendingApprovalWithPrevStatus(
        companyDetails
      );

      return res.status(200).json({
        result: data[0],
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  allPendingApproval: async (req, res) => {
    try {
      const supplierList = await BuyerModel.allPendingApproval();
      console.log(supplierList);
      const data = await BuyerModel.allPendingApprovalWithPrevStatus(
        supplierList
      );

      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  changeStatus: async (req, res) => {
    try {
      let action = "AP1";
      console.log(action);
      const data = await BuyerModel.changeStatus(req, action);
      return res.status(200).json({
        result: data[0],
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  changeStatusID1: async (req, res) => {
    try {
      //console.log(req.user_info);
      const data = await BuyerModel.changeStatusID1(req);
      return res.status(200).json({
        result: data[0],
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  fileUpload_NDA: async (req, res) => {
    try {
      //store file path in database
      const filePath = path.resolve(__dirname, "../../../", req.file.path);
      console.log(filePath);
      console.log(req.file);
      await BuyerModel.addNDAfile(req.params.id, filePath, req.file);

      return res.status(200).json({
        //result: filePath,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error.message,
      });
    }
  },

  fileDownload_NDA: async (req, res) => {
    try {
      //path.resolve(__dirname, '..', '..', '..', 'NDA_Uploads', "")
      let options = {
        root: "",
        dotfiles: "deny",
        headers: {
          "x-timestamp": Date.now(),
          "x-sent": true,
        },
      };
      const file = await BuyerModel.getNDAfile(req.params.id);
      console.log(file);
      const filePath = file[0].file_path;
      if (file.length > 0) {
        res.sendFile(file[0].file_path, options, function (err) {
          console.log(err);
          if (err) {
            res.status(err.statusCode).json({
              result: -1,
              message: "File Not Found",
            });
          }
        });
      } else {
        res.status(404).json({
          result: -1,
          message: "File Not Exist",
        });
      }
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error.message,
      });
    }
  },

  validate_FileUpload_Bulk_Material_Master: async (req, res) => {
    try {
      if (req.file === undefined)
        throw new Error("Error While processing file");

      let sheetProcessingLog = [];
      let workbook = XLSX.readFile(req.file.path);
      let sheet_name_list = workbook.SheetNames;

      let xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );

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

      fs.unlink(req.file.path, function (err) {
        if (err) {
          //console.error(err);
          throw new err();
        }
        console.log("File has been Deleted");
      });

      return res.status(200).json({
        result: sheetProcessingLog,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error.message,
      });
    }
  },

  fileUpload_Bulk_Material_Master: async (req, res) => {
    try {
      if (req.file === undefined)
        throw new Error("Error While processing file");

      let validSheetCount = 0;
      let workbook = XLSX.readFile(req.file.path);
      let sheet_name_list = workbook.SheetNames;

      let xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );

      for (let index = 0; index < xlData.length; index++) {
        const row = xlData[index];
        let validation = await validateMaterialMaster(row);
        console.log(validation);
        validation.status ? (validSheetCount = validSheetCount + 1) : null;
      }

      let currentDate = new Date();
      console.log(currentDate);

      if (xlData.length !== validSheetCount) {
        throw new Error("File containing invalid data");
      }

      // upload in mysql
      const header = Object.keys(xlData[0]);
      // Set up CSV writer
      const csvWriter = createCsvWriter({
        path: path.join(
          process.cwd(),
          "/UploadedFiles/" + req.file.filename.split(".")[0] + ".csv"
        ), // Change this to your desired output file path
        header: header.map((field) => ({ id: field, title: field })), // Define field IDs
      });

      // Write data to CSV
      csvWriter
        .writeRecords(xlData)
        .then(() => {
          console.log("CSV file written successfully");
        })
        .catch((error) => {
          console.error("Error writing CSV file:", error);
        });
      //console.log(sheetProcessingLog);

      // BuyerModel.MaterialMasterBulkDataInsert(
      //   path.join(
      //     process.cwd(),
      //     "/UploadedFiles/" + req.file.filename.split(".")[0] + ".csv"
      //   )
      // );

      return res.status(200).json({
        result: validSheetCount,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error.message,
      });
    } finally {
      if (req.file !== undefined) {
        //delete excel file
        fs.unlink(req.file.path, function (err) {
          if (err) {
            //console.error(err);
            throw new err();
          }
          console.log("File has been Deleted");
        });

        //delete csv file
        // fs.unlink(req.file.path.split(".")[0] + ".csv", function (err) {
        //   if (err) {
        //     //console.error(err);
        //     throw new err();
        //   }
        //   console.log("File has been Deleted");
        // });
      }
    }
  },

  getAllMaterialMasterDetails: async (req, res) => {
    try {
      const data = await BuyerModel.getAllMaterialMasterDetails();

      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
