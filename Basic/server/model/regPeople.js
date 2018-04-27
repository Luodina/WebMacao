'use strict';
let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let regPeople = new mongoose.Schema({
    personname: {
        type: String,
        unique: true,
        required: true
    },
    altname: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    personId: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

module.exports = mongoose.model('regPeople', regPeople);