"use strict"
var mongoose = require('mongoose');

var cameraSchema = new mongoose.Schema({
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
        type: Boolean,
        required: true
    },
    remarks: {
        type: String,
        required: false
    },
    taskid: {
        type: String,
        required: false
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    del_date: {
        type: Date,
        default: ''
    }
});

module.exports = mongoose.model('camera', cameraSchema);