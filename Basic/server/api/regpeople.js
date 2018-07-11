'use strict';
let sequelize = require('../sequelize');
let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const RegPeople = require('../model/REG_PEOPLE')(sequelize, Sequelize);
const config = require('./../config');
let env = config.env || 'dev';
let pageSize = config[env].pageSize;

router.post('/del', function(req, res) {
    console.log('Reg person POST /del');
    let delRegPersonId = Object.withUpperCaseKeys({ _ID: req.body.id });
    console.log("delRegPersonId", delRegPersonId);
    RegPeople.destroy({ where: delRegPersonId }).then((result) => {
        console.log(result);
        res.status(200).send({ status: 'success' });
    }).catch(function(err) {
        res.status(500).send({ status: false, msg: err });
    });
});

router.post('/update', function(req, res) {
    console.log('Reg person POST /update');
    let query = { _ID: req.body.query };
    let newVal = Object.withUpperCaseKeys(req.body.newVal);
    RegPeople.update(newVal, { where: query }).then((result) => {
        console.log(result);
        res.status(200).send({ status: 'success' });
    }).catch(function(err) {
        res.status(500).send({ status: false, msg: err });
    });
});


router.post('/', function(req, res) {
    console.log('Reg person POST /create  req.body.data:', req.body.data);
    let regPerson = Object.withUpperCaseKeys(req.body.data);
    sequelize.transaction(t => {
        regPerson._ID = t.id;
        return RegPeople.create(regPerson).$promise;
    }).then(function() {
        res.send({ status: true });
    }).catch(function(err) {
        res.status(500).send({ status: false, msg: err });
    });
});

router.get('/:id/:page', function(req, res) {
    console.log('Reg people GET /:id/:page');
    let id = { _ID: req.params.id };
    RegPeople.findAll({ where: id }).then(function(people) {
        console.log('=========>people', people);
        let newPeople = [];
        for (var ppl in people) {
            let regPeople = Object.withLowerCaseKeys(people[ppl]);
            newPeople.push(regPeople);
        }
        console.log('=========>newPeople', newPeople);
        res.status(200).send({
            status: 'success',
            msg: newPeople,
            pages: 5 //Math.ceil(count / pageSize)
        });
    }).catch(err => {
        console.log('err', err);
        res.status(403).send({ status: false, msg: err });
    });
});

router.get('/:page', function(req, res) {
    console.log('Reg people GET');
    let page = req.params.page || 1;
    RegPeople.findAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        raw: true
    }).then(function(people) {
        console.log('=========>people', people);
        let newPeople = [];
        for (var ppl in people) {
            let regPeople = Object.withLowerCaseKeys(people[ppl]);
            newPeople.push(regPeople);
        }
        console.log('=========>newPeople', newPeople);
        res.status(200).send({
            status: 'success',
            msg: newPeople,
            pages: 5 //Math.ceil(count / pageSize)
        });
    }).catch(err => {
        console.log('err', err);
        res.status(403).send({ status: false, msg: err });
    });
});
module.exports = router;