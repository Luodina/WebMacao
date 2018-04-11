'use strict';
let mongoose = require('../mongoose');
let Camera = require('../model/cameras');
let express = require('express');
let router = express.Router();

function find(name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection) {
        collection.find(query).toArray(cb);
    });
};

router.post('/add', function(req, res) {
    let cameras = req.body.camera;
    let newCamera = new Camera(cameras);
    newCamera.save(function(err) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send({ status: true });
    })
});

router.get('/all', function(req, res) {
    find('cameras', {}, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ cameras: docs });
    });
});

module.exports = router;