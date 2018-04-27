'use strict';
const mongoose = require('../mongoose');
const express = require('express');
const router = express.Router();
const RegPeople = require('../model/RegPeople');

function find(name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection) {
        collection.find(query).toArray(cb);
    });
}

function del(name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection) {
        collection.remove(query, cb);
    });
}

router.post('/del', function(req, res) {
    let delRegPersonId = req.body.id;
    console.log('delRegPersonId', delRegPersonId);
    del('regpeoples', { _id: mongoose.Types.ObjectId(delRegPersonId) }, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true });
    });
    // mongoose.connection.db.collection('regpeoples').remove({ _id: mongoose.Types.ObjectId(delRegPersonId) }, function(err, result) {
    //     if (err) { res.status(403).send({ status: false, msg: err }); }
    //     res.status(200).send({ status: true });
    // });

});

router.post('/', function(req, res) {
    let regPerson = req.body.data;
    console.log('regPerson', regPerson);
    let newRegPerson = new RegPeople(regPerson);
    newRegPerson.save(function(err) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true });
    })
});

router.get('/', function(req, res) {
    find('regpeoples', {}, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true, docs: docs });
    });
});

module.exports = router;