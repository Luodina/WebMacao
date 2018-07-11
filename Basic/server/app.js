'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import path from 'path';
import favicon from 'serve-favicon';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
let auth = require('./utils/auth');
let app = express();
let env = config.env || 'dev';
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
app.use(express.static(config[env].dist));
app.use(favicon(path.join(__dirname, '../', config[env].dist, '/favicon.ico')));
app.use(cookieParser()); // to support cookie
//app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
// check token
app.use(function(req, res, next) {
    let token = req.body.token || req.query.token || req.cookies.token || req.headers['Authorization'];
    if (req.path.startsWith('/api/st/') || req.path === '/api/user/login') {
        next();
    } else if (token) {
        try {
            let decoded = auth.decode(token);
            if (decoded) {
                // if (decoded.role !== 'super' && req.path.startsWith('/api/user/')) {
                //     res.status(200).send({ status: false, msg: 'authorization problem' });
                // } else {
                req.user = decoded;
                next();
                // }
            } else {
                console.error('invalid token, return 403');
                res.status(403).send({ status: false, msg: 'invalid token' });
            }
        } catch (err) {
            console.error(err.name + ' caught, return 403');
            res.status(403).send({ status: false, msg: err.name });
        }
    } else {
        console.error('token not found, return 403');
        res.status(403).send({ status: false, msg: 'token not found' });
    }
});
// rest api
app.use('/api/user', require('./api/user'));
app.use('/api/db/people', require('./api/regpeople'));
app.use('/api/db/camera', require('./api/camera'));
app.use('/api/people', require('./api/rtm'));
app.use('/api/history', require('./api/history'));
app.use('/api/config', function(req, res) {
    res.status(200).send(config[env]);
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', config[env].dist, '/404.html')); // load the single view file (angular will handle the page changes on the front-end)
});
let sequelize = require('./sequelize');
sequelize.sync().then(() => {
    app.listen(config[env].port, function() {
        console.log('App listening on port ' + config[env].port + '!');
    });
});

module.exports = app;