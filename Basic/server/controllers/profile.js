// 'use strict'
// var mongoose = require('mongoose');
// //var User = mongoose.model('User');
// var User = require('../model/users'); //mongoose.model('User');

// console.log("User in profile", User)
// module.exports.profileRead = function(req, res) {
//     console.log("Arrived")
//     if (!req.payload._id) {
//         res.status(401).json({
//             "message": "UnauthorizedError: private profile"
//         });
//     } else {
//         User
//             .findById(req.payload._id)
//             .exec(function(err, user) {
//                 res.status(200).json(user);
//             });
//     }

// };