'use strict';
let jwt = require('jsonwebtoken');
const SECRET = '1234';
const THREE_HOURS = 60 * 60 * 3; // Seconds in 3 hours
module.exports = {
    encode: function(username, role) {
        if (!username) {
            return null;
        }
        let plaintext = {
            role: role,
            username: username,
            iat: Date.now() / 1000,
            exp: Date.now() / 1000 + THREE_HOURS
        };
        let ciphertext = jwt.sign(plaintext, SECRET);

        return ciphertext;
    },
    decode: function(ciphertext) {
        if (!ciphertext) {
            return null;
        }
        try {
            let plaintext = jwt.verify(ciphertext, SECRET);
            if (plaintext.username && plaintext.role) {
                return plaintext;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
};