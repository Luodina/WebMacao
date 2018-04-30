'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import path from 'path';
import favicon from 'serve-favicon';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import http from 'http';
import iosocket from 'socket.io';
let app = express();
let env = config.env || 'dev';

let server = http.createServer(app);
let io = iosocket.listen(server);
// Socket.io Communication

io.sockets.on('connection', require('./api/socket'));
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
app.use('/api/db/people', require('./api/regpeople'));
app.use('/api/db/camera', require('./api/camera'));
app.use('/api/people', require('./api/rtm'));


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', config[env].dist, '/404.html')); // load the single view file (angular will handle the page changes on the front-end)
});

// app.listen(config[env].port, function() {
//     console.log('App listening on port ' + config[env].port + '!');
// });
server.listen(config[env].port, function() {
    console.log('App listening on port ' + config[env].port + '!');
})
module.exports = app;