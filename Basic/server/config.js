'use strict';
module.exports = {
    dev: {
        dist: 'app',
        port: 3000,
        db: 'postgres://luodina:777777@127.0.0.1:5432/mcfr', //'mongodb://user01:abcd1234@10.254.1.66:27017/mcfr',
        STserver: 'http://10.232.1.49:80',
        qualityScore: 0.2,
        similarity: 0.49,
        STDBname: 'TEST03',
        kurentoIP: '10.254.1.66',
        kurentoPort: '8888',
        //STresURL: '10.254.0.198:3040/collectresult',
        STresURL: '10.254.1.66:3040/collectresult',
        STDBscore: '0.5',
        PERIOD: 5000,
        pageSize: 20
    },
    prod: {
        dist: 'app',
        port: 5555,
        db: 'mongodb://user01:abcd1234@10.254.1.66:27017/mcfr',
        STserver: 'http://10.232.1.49:80',
        qualityScore: 0.2,
        similarity: 0.49,
        STDBname: 'TEST03',
        kurentoIP: '10.254.1.66',
        kurentoPort: '8888',
        //STresURL: '10.254.0.198:3040/collectresult',
        STresURL: '10.254.1.66:3040/collectresult',
        STDBscore: '0.5',
        PERIOD: 1000,
        pageSize: 20
    },
    democonf: {
        dist: 'app',
        port: 3050,
        db: 'mongodb://user01:abcd1234@127.0.0.1:27017/mcfr',
        STserver: 'http://10.232.1.49:80',
        qualityScore: 0.2,
        similarity: 0.49,
        STDBname: 'TESTDEMO',
        kurentoIP: '10.254.1.66',
        kurentoPort: '8888',
        //STresURL: '10.254.0.198:3040/collectresult',
        STresURL: '10.254.1.66:3040/collectresult',
        STDBscore: '0.5',
        PERIOD: 10000,
        pageSize: 20
    },
    env: 'dev',
    trans: 'en'
};