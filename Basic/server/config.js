'use strict';
module.exports = {
    dev: {
        dist: 'app',
        port: 5555,
        db: 'mongodb://localhost/sensetimedb',
        STserver: 'http://10.232.1.49:80'
    },
    prod: {
        dist: 'app',
        port: 5555,
        db: 'mongodb://user01:abcd1234@10.254.1.66:27017/mcfr',
        STserver: 'http://10.232.1.49:80'
    },
    env: 'dev',
    trans: 'zh'
};