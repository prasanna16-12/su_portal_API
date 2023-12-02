const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Define middleware for file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if directory exist or not
    const dir = path.join(process.cwd(), "/UploadedFiles/Nda")
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)    
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    //const reg_code = req.params.id;
    cb(
      null,
      Date.now() +
        "_" +
        req.user_info.user_ID +
        "_NDA." +
        file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
