'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import path from 'path';
import favicon from 'serve-favicon';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';

let app = express();
let env = config.env || 'dev';
//console.log('app', app)
// var jwt = require('express-jwt');
// var auth = jwt({
//     secret: 'MY_SECRET',
//     userProperty: 'payload'
// });

// use logger.xxx instead of console.xxx
// let logger = require('./utils/log')('app.js');
//let auth = require('./utils/auth');
if (env === 'dev') {
    app.use(require('connect-livereload')());
    app.use('/fonts', express.static('app/bower_components/bootstrap/fonts'));
}
app.use('/api/st', proxy({
    //headers: { 'Authorization': 'token ' + config[env].token },
    target: config[env].STserver,
    //changeOrigin: true,
    pathRewrite: {
        '^/api/st/': '/'
    },
    ws: true,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // console.log('proxy', proxyReq.context, proxyReq.opts)
        //     // Log outbound request to remote target
        // if (req.method === "POST") {
        //     console.log('--> req.body ', req.body, '-->  ', proxyReq.host, proxyReq.path, '->', proxyReq.host + proxyReq.path);
        //     console.log('--> req.headers');
        //     console.log('--> config[env].STserver ', config[env].STserver)
        //     var options = {
        //         url: config[env].STserver + proxyReq.path,
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         json: req.body
        //     };
        //     console.log('--> options', options);
        //     request(options, function(err, res, body) {
        //         if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        //             console.log(body);
        //             res.status(200).send({ body: body });
        //         }
        //     });
        // }
        // console.log('--> res', res)
    },
    onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({ error: 'Error when connecting to remote server.' });
    }
}));

// web server full logs
//var log4js = require('log4js');
//app.use(log4js.connectLogger(logger,{level:log4js.levels.INFO}));
app.use(express.static(config[env].dist));
app.use(favicon(path.join(__dirname, '../', config[env].dist, '/favicon.ico')));


app.use(cookieParser()); // to support cookie
//app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// 上游验证token
// app.use(function(req, res, next) {
//     let token = req.body.token || req.query.token || req.cookies.aura_token || req.headers['Authorization'];
//     console.log("token", token)
//     if (req.path.startsWith('/api/user/login') || req.path.startsWith('/datasets')) {
//         next();
//     } else if (token) {
//         try {
//             let decoded = auth.decode(token);
//             if (decoded) {
//                 req.user = decoded;
//                 next();
//             } else {
//                 console.error('invalid token, return 403');
//                 res.status(403).send({ status: false, msg: 'invalid token' });
//             }
//         } catch (err) {
//             console.error(err.name + ' caught, return 403');
//             res.status(403).send({ status: false, msg: err.name });
//         }
//     } else {
//         console.error('token not found, return 403');
//         res.status(403).send({ status: false, msg: 'token not found' });
//     }
// });

// request(options, function(err, res, body) {
//     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
//         console.log(body);
//     }
//     console.log('here we are', body);
// });

// rest api
app.use('/api/user', require('./api/user'));
app.use('/api/people', require('./api/people'));
app.use('/api/db/camera', require('./api/camera'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', config[env].dist, '/404.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(config[env].port, function() {
    console.log('App listening on port ' + config[env].port + '!');
});

module.exports = app;