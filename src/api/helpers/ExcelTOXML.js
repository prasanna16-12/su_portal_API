const fs = require("fs");
const xmlbuilder = require("xmlbuilder");

module.exports = {
  excelTOXML: (data) => {
    // Create an XML root element
    const xmlRoot = xmlbuilder.create("data");

    // Loop through the JSON data and add it to the XML
    data.forEach((row) => {
      const xmlRow = xmlRoot.ele("row");

      // Assuming each column in the Excel corresponds to an XML element
      Object.keys(row).forEach((key) => {
        xmlRow.ele(key, row[key]);
      });
    });

    // Convert the XML object to a string
    return xmlString = xmlRoot.end({ pretty: false });
  },
};
