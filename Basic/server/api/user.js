'use strict';
let sequelize = require('../sequelize');
let Sequelize = require('sequelize');
let Users = require('../model/USERS')(sequelize, Sequelize);
let express = require('express');
let router = express.Router();
let auth = require('../utils/auth');
const config = require('./../config');
// let url = require('url');
// let env = config.env || 'dev';
// let isUUID = require('is-uuid');
// let logger = require('../utils/log')('./api/users.js');
router.post('/login', function(req, res) {
    let username = req.body.username;
    let pass = req.body.password;
    console.log('/login', req.body.password);
    if (username && pass) {
        Users.findOne({
            attributes: ['_ID', 'NAME', 'PASSWORD', 'ROLE'],
            where: {
                NAME: username
            },
            raw: true
        }).then(function(user) {
            console.log('=========>user', user);
            if (user) {
                if (user.PASSWORD !== pass) {
                    res.status(200).send({ status: false, msg: 'web_login_valmsg_wrongpass' }); //Use Message Code
                } else {
                    let token = auth.encode(user.NAME, user.ROLE);
                    console.log('=========>token', token);
                    res.setHeader('Set-Cookie', ['token=' + token]);
                    res.status(200).send({ status: true, role: user.role, token: token });
                }
            } else {
                res.status(200).send({ status: false, msg: 'web_login_valmsg_nouser' }); //Use Message Code       
            }
        }).catch(err => {
            console.log('err', err);
            res.status(403).send({ status: false, msg: err });
        });
    } else {
        res.status(403).send({ status: false, msg: 'Username and password cannot be blank' });
    }
});

module.exports = router;