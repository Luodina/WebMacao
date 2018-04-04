'use strict';
module.exports = {
    dev: {
        dist: 'app',
        port: 9000,
        // mysql: 'mysql://@MYSQL_UNAME@:@MYSQL_PWD@@@MYSQL_ADDR@/@MYSQL_DATABASE@',10.254.0.47
        mysql: 'mysql://root:777777@127.0.0.1:3306/Sensetime',
        //mysql: 'mysql://root:777777@10.254.0.47:3306/Sensetime',
    },
    prod: {},
    env: 'dev',
    trans: 'zh'
};