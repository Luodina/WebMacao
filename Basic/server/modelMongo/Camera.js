'use strict';
let mongoose = require('mongoose');

let cameraSchema = new mongoose.Schema({
    name: {
        type: String,
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
    rtsprt: {
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
        required: false
    }
});

module.exports = mongoose.model('camera', cameraSchema);