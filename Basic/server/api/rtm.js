'use strict';
let sequelize = require('../sequelize');
let Sequelize = require('sequelize');
import config from '../config';
const express = require('express');
const router = express.Router();
let RtmResults = require('../model/RESULT')(sequelize, Sequelize);
//let env = config.env || 'dev';
//let sizeof = require('object-sizeof');
router.get('/rtmall', function(req, res) {
    console.log('get ==> rtmall:');
    let v_qualityScore = config[config.env].qualityScore;
    let v_similarity = config[config.env].similarity;
    let result = [];
    res.status(200).send({ dbList: [] });
});
router.get('/rtmreg', function(req, res) {
    console.log('get ==> rtmreg:');
    let v_qualityScore = config[config.env].qualityScore;
    let v_similarity = config[config.env].similarity;
    let result = [];
    res.status(200).send({ dbList: [] });
});
module.exports = router;