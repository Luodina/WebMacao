'use strict';
let mongoose = require('mongoose');

let regPeopleScheme = new mongoose.Schema({
    personname: {
        type: String,
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
    image: {
        type: String, //Buffer,
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
    create_dt: {
        type: Date,
        required: true
    },
    update_dt: {
        type: Date,
        required: false
    },
    hash: String,
    salt: String
});

module.exports = mongoose.model('regpeople', regPeopleScheme);