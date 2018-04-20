'use strict';
let mongoose = require('../mongoose');
let Camera = require('../model/cameras');
let express = require('express');
let router = express.Router();

function find(name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection) {
        collection.find(query).toArray(cb);
    });
}

router.post('/', function(req, res) {
    let cameras = req.body.camera;
    let newCamera = new Camera(cameras);
    newCamera.save(function(err) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true });
    });
});
router.put('/', function(req, res) {
    let query = { _id: mongoose.Types.ObjectId(req.body.query) };
    let newVal = req.body.newVal;
    console.log('query', query, 'newVal', newVal);
    mongoose.connection.db.collection('cameras').updateOne(query, { $set: newVal }, // replacement, replaces only the field "hi"
        function(err, docs) {
            if (err) { res.status(403).send({ status: false, msg: err }); }
            console.log("1 document updated");
            res.status(200).send(docs);
        });
});
router.delete('/', function(req, res) {
    let cameras = req.body.camera;
    console.log('cameras from camera.js', cameras);
    let query = { _id: mongoose.Types.ObjectId(cameras._id) };
    mongoose.connection.db.collection('cameras').remove(query, // replacement, replaces only the field "hi"
        function(err, docs) {
            if (err) { res.status(403).send({ status: false, msg: err }); }
            console.log("1 document removed");
            res.status(200).send(docs);
        });
});
router.get('/', function(req, res) {
    find('cameras', {}, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send(docs);
    });
});
router.get('/:name', function(req, res) {
    let name = mongoose.Types.ObjectId(req.params.name);
    find('cameras', { _id: name }, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send(docs);
    });
});

module.exports = router;