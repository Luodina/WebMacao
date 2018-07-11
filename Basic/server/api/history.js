'use strict';
const express = require('express');
const router = express.Router();
let RtmResults = require('../model/RESULT');
let sizeof = require('object-sizeof');
const config = require('./../config');
let env = config.env || 'dev';
const qualityScore = config[env].qualityScore;
const similarity = config[env].similarity;
const pageSize = config[env].pageSize;

router.get('/', function(req, res) {
    let search;
    let result = [];
    let page = req.query.page || 1;
    if (req.query.searchData) { search = JSON.parse(req.query.searchData) }
    // let searchData = req.query.searchData;
    // let search = JSON.parse(searchData);
    //console.log('search============>', search)
    let condition = {
        $match: {
            $and: [
                { 'person': { $exists: true } }
            ]
        }
    };
    let tmp;
    if (search._id) {
        tmp = mongoose.Types.ObjectId(search._id);
        search._id = tmp;
    }
    if (search && search._id) {
        condition["$match"]["$and"].push({ 'person.0': { $exists: true } });
        condition["$match"]["$and"].push({ 'person.0._id': { $exists: true, $eq: tmp } });
    } else if (search) {
        if (search.name) {
            let searchInclUnregistr;
            if (search.inclUnregistr) { //true means $exists: false 
                searchInclUnregistr = {
                    $or: [{ 'person.0.personname': { $exists: true, $eq: search.name } },
                        { 'person.0': { $exists: false } }
                    ]
                };
            } else {
                searchInclUnregistr = { 'person.0.personname': { $exists: true, $eq: search.name } };
            }
            //console.log('searchInclUnregistr============>', searchInclUnregistr)
            condition["$match"]["$and"].push(searchInclUnregistr);
        }
        if (search.camera) {
            condition["$match"]["$and"].push({ 'camera.0.name': { $exists: true, $eq: search.camera } });
        }

        if (search.location) {
            condition["$match"]["$and"].push({ 'camera.0.location': { $exists: true, $eq: search.location } });
        }
        if ((!search.name) && (search.inclUnregistr === false)) {
            condition["$match"]["$and"].push({ 'person.0': { $exists: true } });
        }
    }
    //console.log('condition============>', condition["$match"]["$and"]);
    // mongoose.connection.db.collection('collectresultsrts')
    RtmResults
        .aggregate([{
                $lookup: {
                    from: "regpeoples",
                    localField: "imageid",
                    foreignField: "imageId",
                    as: "person"
                }
            },
            {
                $lookup: {
                    from: "cameras",
                    localField: "taskid",
                    foreignField: "taskid",
                    as: "camera"
                }
            },
            condition
        ])
        .sort({ rec_time: -1 })
        .skip((page - 1) * pageSize).limit(pageSize)
        .exec(function(err, docs) {
            if (err) { res.status(403).send({ status: false, msg: err }); }
            if (docs) {
                RtmResults.find(search).count().exec(function(err, count) {
                    if (err) { res.status(403).send({ status: false, msg: err }); }
                    docs.map(item => {
                            let newItem = {
                                rec_time: item.rec_time,
                                similarity: item.similarity,
                                image_file: item.image_file
                            };
                            if (item.person && item.person[0]) {
                                newItem._id = item.person[0]._id;
                                newItem.personname = item.person[0].personname;
                            }
                            if (item.camera && item.camera[0]) {
                                newItem.location = item.camera[0].location;
                                newItem.name = item.camera[0].name
                            }
                            result.push(newItem)
                        })
                        //console.log('docs  size===>', sizeof(docs));
                        //console.log('result size===>', sizeof(result));
                        //console.log('result===>', result);
                    docs = result;
                    res.status(200).send({ dbList: docs, pages: Math.ceil(count / pageSize) });
                })
            }
        })
});
module.exports = router;