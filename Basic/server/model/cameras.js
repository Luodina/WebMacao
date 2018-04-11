"use strict"
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
console.log("in cameras.js")

var Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rtsp: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('cameras', Schema);