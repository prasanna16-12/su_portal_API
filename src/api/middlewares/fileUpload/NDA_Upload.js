const multer = require('multer')

// Define middleware for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../SERVER/NDA_Uploads')
    },
    filename: function (req, file, cb) {
        const reg_code = req.params.id
        cb(null, reg_code + "-NDA." + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage })

module.exports = upload