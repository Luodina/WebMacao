'use strict';
const express = require('express');
const router = express.Router();
let rtmResults = require('../model/CollectResultRTModel');

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

router.post('/', function(req, res) {
    let regPerson = req.body.data;
    console.log('regPerson', regPerson)
        // let newCamera = new Camera(cameras);
        // newCamera.save(function(err) {
        //     if (err) { res.status(403).send({ status: false, msg: err }); }
    res.status(200).send({ status: true });
    // });
});

module.exports = router;