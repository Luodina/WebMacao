'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//let SchemaTypes = mongoose.Schema.Types;

let resultRTModelSchema = new Schema({
    taskid: {
        type: String
    },
    imageid: {
        type: String
    },
    imageurl: {
        type: String
    },
    image_height: {
        type: Number
    },
    image_width: {
        type: Number
    },
    image_file: {
        type: Buffer
    },
    similarity: {
        //type: SchemaTypes.Long,
        type: Number
    },
    qualityScore: {
        //type: SchemaTypes.Long,
        type: Number
    },
    rec_time: {
        type: Date
    }, //Raw string, for comparison
    imgMode: {
        type: Number
    },
    type: {
        type: Number
    },
    trackIdx: {
        type: String
    },
    create_dt: {
        type: Date,
        default: Date.now
    },
    last_upd_dt: {
        type: Date,
        default: Date.now
    }
    /*
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    }
    */

});

module.exports = mongoose.model('resultrtmodel', resultRTModelSchema);