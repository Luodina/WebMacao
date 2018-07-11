'use strict';
let sequelize = require('../sequelize');
let Sequelize = require('sequelize');
let Camera = require('../model/CAMERA')(sequelize, Sequelize);
let express = require('express');
let router = express.Router();
const config = require('./../config');

Object.withUpperCaseKeys = function upperCaseKeys(o) {
    // this solution ignores inherited properties
    var r = {};
    for (var p in o)
        r[p.toUpperCase()] = o[p];
    return r;
}
Object.withLowerCaseKeys = function lowerCaseKeys(o) {
    // this solution ignores inherited properties
    var r = {};
    for (var p in o)
        r[p.toLowerCase()] = o[p];
    return r;
}
router.post('/', function(req, res) {
    console.log('CAMERA POST');
    let cam = Object.withUpperCaseKeys(req.body.camera);
    sequelize.transaction(t => {
        cam._ID = t.id;
        console.log('cam=====================>', cam);
        return Camera.create(cam).$promise;
    }).then(function() {
        res.send({ status: true });
    }).catch(function(err) {
        res.status(500).send({ status: false, msg: err });
    });
});
router.put('/', function(req, res) {
    console.log('CAMERA PUT');
    let query = { _ID: req.body.query };
    let newVal = req.body.newVal;
    if (!newVal.status) {
        let date = new Date().toISOString();
        newVal.del_date = date;
    }
    newVal = Object.withUpperCaseKeys(req.body.camera);
    Camera.update(newVal, { where: query }).then(function(camera) {
        console.log('=========>camera', camera);
        let newcam = [];
        for (var cm in camera) {
            let cam = Object.withLowerCaseKeys(camera[cm]);
            newcam.push(cam);
        }
        res.status(200).send(newcam);
    }).catch(err => {
        console.log('err', err);
        res.status(403).send({ status: false, msg: err });
    });
});
router.post('/del', function(req, res) {
    console.log('DEL');
    let query = { _id: mongoose.Types.ObjectId(req.body.query) };
    let date = new Date().toISOString();
    mongoose.connection.db.collection('cameras').updateOne(query, { $set: { 'del_date': date } }, // replacement, replaces only the field "hi"
        function(err, docs) {
            if (err) return res.status(403).send({ status: false, msg: err });
            //console.log('1 document updated');
            res.status(200).send({ status: 'success', msg: docs });
        });
});
router.get('/', function(req, res) {
    console.log('CAMERA GET');
    Camera.findAll({
        raw: true
    }).then(function(camera) {
        console.log('=========>camera', camera);
        let newcam = [];
        for (var cm in camera) {
            let cam = Object.withLowerCaseKeys(camera[cm]);
            newcam.push(cam);
        }
        console.log('=========>newcam', newcam);
        res.status(200).send(newcam);
    }).catch(err => {
        console.log('err', err);
        res.status(403).send({ status: false, msg: err });
    });
});

router.get('/:name', function(req, res) {
    console.log('CAMERA GET /:name');
    let name = req.params.name;
    Camera.findOne({
        // attributes: ['_ID', 'NAME', 'PASSWORD', 'ROLE'],
        where: {
            _ID: name
        },
        raw: true
    }).then(function(camera) {
        let newcam = Object.withLowerCaseKeys(camera);
        console.log('=========>newcam  ===>', newcam);
        res.status(200).send(newcam);
    }).catch(err => {
        console.log('err', err);
        res.status(403).send({ status: false, msg: err });
    });
});



module.exports = router;