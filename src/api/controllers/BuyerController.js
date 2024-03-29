const fs = require("fs");
const path = require("path");
const BuyerModel = require("../models/BuyerModel");
const MaterialModel = require("../models/MaterialModel");
const XLSX = require("xlsx");
const RFQ = require("../models/RFQ");
const bulkUpload = require("../models/BulkUpload");

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
        req.user_info.user_ID,
        req.files
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
      //console.log(supplierList);
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
      //console.log(action);
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
      if (req.file === undefined)
        throw new Error("Error While processing file");

      let data = await BuyerModel.addNDAfile(req);

      data = data[0];
      if (data.Message === "FILE UPDATED" && data.FilePath) {
        //delete existing file
        fs.unlink(data.FilePath, function (err) {
          if (err) {
            //console.error(err);
            //throw new err();
          }
          //console.log("File has been Deleted");
        });
      }

      return res.status(200).json({
        //result: filePath,
        message: data.Message,
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
      let options = {
        root: "",
        dotfiles: "deny",
        headers: {
          "x-timestamp": Date.now(),
          "x-sent": true,
        },
      };
      const file = await BuyerModel.getNDAfile(req);

      if (file.length > 0) {
        res.sendFile(file[0].path, options, function (err) {
          //console.log(err);
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

  validate_FileUpload_Bulk_Material_Master: async (req, res, err) => {
    console.log(err);
    try {
      if (req.file === undefined)
        throw new Error("Error While processing file");
      const data = await bulkUpload.validateMaterialMasterFile(req.file);
      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error.message,
      });
    } finally {
      fs.unlink(req.file.path, function (err) {
        if (err) {
          //console.error(err);
          throw new err();
        }
        //console.log("File has been Deleted");
      });
    }
  },

  fileUpload_Bulk_Material_Master: async (req, res) => {
    try {
      if (req.file === undefined)
        throw new Error("Error While processing file");

      const dataValidation = await bulkUpload.validateMaterialMasterFile(
        req.file
      );
      const invalidRows = dataValidation
        .filter((row) => {
          return row.processingStatus.status === false;
        })
        .map((row) => {
          return row.processingStatus.status;
        });

      //console.log(invalidRows);
      if (invalidRows.length > 0) {
        return res.status(500).json({
          result: -1,
          message: 'file contains invalid data',
        });
      }
      //(dataValidation)

      let workbook = XLSX.readFile(req.file.path);
      let sheet_name_list = workbook.SheetNames;

      let xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );

      //console.log(xlData);
      // create xml from excel
      //let materialMasterXML = excelToXML.excelTOXML(xlData)

      //upload to to DB
      let data = await MaterialModel.insertMatrialMasterDataBULK(
        JSON.stringify(xlData),
        req.user_info.user_ID
      );

      return res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        result: -1,
        message: error,
      });
    } finally {
      if (req.file !== undefined) {
        //delete excel file
        fs.unlink(req.file.path, function (err) {
          if (err) {
            //console.error(err);
            throw new err();
          }
          //console.log("File has been Deleted");
        });
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

  materialDataByID: async (req, res) => {
    try {
      const data = await BuyerModel.materialDataByID(req.params.id);
      //console.log(data);
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

  updateMaterialMaster: async (req, res) => {
    try {
      if (!req.params.id) {
        throw new Error("Material ID missing");
      }
      const data = await MaterialModel.updateMatrialMasterData(
        req.params.id,
        req.body,
        req.user_info.user_ID
      );
      //console.log(data);
      return res.status(200).json({
        //result: data,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  createRFQ: async (req, res) => {
    try {
      const data = await RFQ.createRFQHeader(req.body, req.user_info.user_ID);
      //console.log(data[0]);
      await RFQ.addRFQLineItems(req.body.line_items, data[0].rfq_header_ID);
      await RFQ.addRFQVendors(req.body.vendors, data[0].rfq_header_ID);

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

  listViewRFQ: async (req, res) => {
    try {
      let page = req.query.page && req.query.page > 0 ? req.query.page : 1;
      let limit = req.query.limit && req.query.limit > 0 ? req.query.limit : 10;

      //console.log(page, limit);
      const data = await RFQ.getlistViewRFQ(
        req.body,
        req.user_info.user_ID,
        page,
        limit
      );

      return res.status(200).json({
        result: data[0],
        total_records: data[1][0].total_records,
        current_page_size: data[0].length,
        current_page: parseInt(page),
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  modifyDraftRFQ: async (req, res) => {
    try {
      await RFQ.modifyDraftRFQ(req.body, req.params.id);
      await RFQ.addRFQLineItems(req.body.line_items, req.params.id);
      await RFQ.addRFQVendors(req.body.vendors, req.params.id);

      return res.status(200).json({
        result: req.params.id,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updateRFQ: async (req, res) => {
    try {
      let updatedRFQ = await RFQ.updateRFQ(req.body, req.params.id);
      let msg = updatedRFQ[1][0].MESSAGE;
      //console.log(msg);
      if (msg.startsWith("UPDATE NOT POSSIBLE")) {
        return res.status(200).json({
          message: msg,
        });
      }
      updatedRFQ = await RFQ.updateRFQLineItems(
        req.body.line_items,
        updatedRFQ[0][0]
      );
      //console.log(updatedRFQ[]);
      //await RFQ.addRFQVendors(req.body.vendors, req.params.id)

      return res.status(200).json({
        result: updatedRFQ,
        message: msg,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  close: async (req, res) => {
    try {
      let updatedRFQ = await RFQ.changeStatusRFQ(req.params.id, "CLOSE");
      //console.log(updatedRFQ);

      return res.status(200).json({
        result: updatedRFQ,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  hold: async (req, res) => {
    try {
      let updatedRFQ = await RFQ.changeStatusRFQ(req.params.id, "HOLD");
      //console.log(updatedRFQ);

      return res.status(200).json({
        result: updatedRFQ,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  unhold: async (req, res) => {
    try {
      let updatedRFQ = await RFQ.changeStatusRFQ(req.params.id, "UNHOLD");
      //console.log(updatedRFQ);

      return res.status(200).json({
        result: updatedRFQ,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  compareRFQQuote: async (req, res) => {
    try {
      if (!req.params.id) {
        throw new Error("Material ID missing");
      }

      let RFQ_ID = req.params.id;
      let data = await RFQ.compareRFQQuote(RFQ_ID);
      console.log(data);
      //let msg = data[0].length !== 0 ? data[0][0].MESSAGE : "Incorrect RFQ ID";

      if (data[0][0]?.MESSAGE === "VENDOR(S) HAVE NOT RESPONDED") {
        return res.status(200).json({
          result: {
            message: data[0][0].MESSAGE,
            vendors: data[1],
            deadline: data[2][0].DEADLINE,
            rfq: {
              header: data[3],
              line_item: data[4],
              quote: data[5],
            },
          },
        });
      }

      return res.status(200).json({
        result: {
          message: data[3][0].MESSAGE,
          rfq: {
            header: data[0],
            line_item: data[1],
            quote: data[2],
          },
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  RFQByID: async (req, res) => {
    try {
      const data = await RFQ.getRFQDetailsByIDForBuyer(req.params.id);
      //console.log(data);
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
