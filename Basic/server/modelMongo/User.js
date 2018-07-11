'use strict';
let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // status: {
    //     type: Boolean,
    //     required: true
    // },
    role: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
// { name:'marta', password:'a763a66f984948ca463b081bf0f0e6d0',status:true, role:'admin'}
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'MY_SECRET'); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

//mongoose.model('User', userSchema);
module.exports = mongoose.model('user', userSchema);