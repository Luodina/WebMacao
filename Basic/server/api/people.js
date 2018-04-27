'use strict';
const express = require('express');
const router = express.Router();
let regPeople = require('../model/regPeople');
// const auth = require('../utils/auth');
// const path = require('path');
// const config = require('./../config');
// const env = config.env || 'dev';
// const fs = require('fs');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function destination(req, destination, cb) {
//         cb(null, path.join(__dirname, '../../pics'));
//     },

//     filename: function filename(req, file, cb) {
//         cb(null, file.originalname);
//         //dataFileName = file.originalname;
//     }
// });

// const upload = multer({ storage: storage });
// function readFiles(dirname, onFileContent, onError) {
//     fs.readdir(dirname, function(err, filenames) {
//         if (err) {
//             onError(err);
//             return;
//         }
//         filenames.forEach(function(filename) {
//             fs.readFile(dirname + filename, 'utf-8', function(err, content) {
//                 if (err) {
//                     onError(err);
//                     return;
//                 }
//                 onFileContent(filename, content);
//             });
//         });
//     });
// };

router.post('/', function(req, res) {
    let regPerson = req.body.data;
    console.log('regPerson', regPerson)
    let newRegPerson = new regPeople(regPerson);
    newRegPerson.save(function(err) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true });
    })
});
// router.post('/upload', upload.single('file'), function(req, res) {
//     let imgs = [];
//     let filePath = path.join(__dirname, '../../pics/')
//     let filename = req.file.originalname;

//     readFiles(filePath, function(filename, content) {
//         imgs.push({ imageDatas: content });
//         res.status(200).send({ fileName: req.file.originalname, imgs: imgs });
//     }, function(err) {
//         throw err;
//     });
// });
module.exports = router;