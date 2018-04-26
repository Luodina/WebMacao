'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const path = require('path');
const config = require('./../config');
const env = config.env || 'dev';
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function destination(req, destination, cb) {
        cb(null, path.join(__dirname, '../../pics'));
    },

    filename: function filename(req, file, cb) {
        cb(null, file.originalname);
        //dataFileName = file.originalname;
    }
});

const upload = multer({ storage: storage });
router.get('/rtm', function(req, res) {
    let rtm = { id: '123456789', name: 'Kitty', age: '5', foto: 'https://sanrio-production-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDYvMTQvMjAvNDgvMzQvMTM3L2NocmFjdGVyX2hlbGxvX2tpdHR5LmpwZyJdXQ/chracter-hello-kitty.jpg?sha=f5e7c272d3fc6e78' };
    res.status(200).send({ rtm: rtm });
})
router.get('/fromdb', function(req, res) {
    let dbList = [
        { name: 'Tom', age: '5', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_gwa3xpo2/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Jerry', age: '2', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_gwa3xpo2/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Panda', age: '2', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_gwa3xpo2/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Grizz', age: '5', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_j30f8x9p/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Jerry', age: '2', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_gwa3xpo2/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Panda', age: '2', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_gwa3xpo2/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' },
        { name: 'Grizz', age: '5', foto: 'https://cfvod.kaltura.com/p/1836881/sp/183688100/thumbnail/entry_id/0_j30f8x9p/version/100012/width/133/height/133/type/3/bgcolor/000000/width/90/height/90/type/3/bgcolor/000000' }

    ];
    res.status(200).send({ dbList: dbList });
});
router.post('/upload', upload.single('file'), function(req, res) {
    res.status(200).send({ fileName: req.file.originalname });
});
module.exports = router;