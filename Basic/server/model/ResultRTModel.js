'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var resultRTModelSchema = new Schema({
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
    user_idx: {
        //type: SchemaTypes.Long,
        type: String
    },

    qualityScore: {
        //type: SchemaTypes.Long,
        type: Number
    },

    rec_time: {
        type: Date
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