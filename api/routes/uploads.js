var express = require('express');
var router = express.Router();
var multer = require('multer');

// file uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});


module.exports = router;
