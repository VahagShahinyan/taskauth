const express = require('express');
const multer = require('multer')
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }
);

var upload = multer({ storage: storage });

const FileController = require('../controller/file.controller')

const fileController = new FileController();

const router = express.Router()

router.post('/upload', upload.array('files', 100), fileController.create)
router.put('/upload/:id', upload.single('file'), fileController.update)

router.get('/list', fileController.getList)
router.get('/:id', fileController.get)
router.get('/download/:id', fileController.downloadFile)
router.delete('/delete/:id', fileController.delete)
module.exports = router