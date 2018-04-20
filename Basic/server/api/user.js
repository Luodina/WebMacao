'use strict';
let mongoose = require('../mongoose');
let User = require('../model/users');
let express = require('express');
let router = express.Router();
let auth = require('../utils/auth');
//const config = require('./../config');
//let env = config.env || 'dev';
//let isUUID = require('is-uuid');
//let logger = require('../utils/log')('./api/users.js');

function find(name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection) {
        collection.find(query).toArray(cb);
    });
}
router.post('/login', function(req, res) {
    let username = req.body.username;
    let pass = req.body.password;
    if (username && pass) {
        find('User', { name: username }, function(err, docs) {
            if (err) { res.status(403).send({ status: false, msg: err }); }
            let user;
            if (docs) { user = docs[0]; }
            if (!user) {
                res.status(403).send({ status: false, msg: 'Username not found' });
            } else {
                if (user.password !== pass) {
                    res.status(403).send({ status: false, msg: 'Invalid password' });
                } else {
                    let token = auth.encode(user.name);
                    res.setHeader('Set-Cookie', ['aura_token=' + token]);
                    res.status(200).send({ status: true, token: token });
                }
            }
        });
    } else {
        res.status(403).send({ status: false, msg: 'Username and password cannot be blank' });
    }
});
router.post('/add', function(req, res) {
    console.log('req.body', req.body);
    let users = req.body.user;
    let newUser = new User(users);
    newUser.save(function(err) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ status: true });
    });
});
router.get('/all', function(req, res) {
    find('User', {}, function(err, docs) {
        if (err) { res.status(403).send({ status: false, msg: err }); }
        res.status(200).send({ users: docs });
    });
});

module.exports = router;