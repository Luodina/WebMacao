'use strict';
let Sequelize = require('sequelize');
let config = require('./config');
let env = config.env || 'dev';
let sequelize = new Sequelize(config[env].mysql);
// let sequelize = new Sequelize(config[env].mariadb, { logging: false });
// use log helper
//let logger = require('./utils/log')('sequelize.js');
//console.log('sequelize.authenticate', sequelize);

sequelize.authenticate()
    .then(() => {
        console.log('Connection to', config[env].mysql, ' has been established successfully.');
        //logger.debug('Connection to', config[env].mariadb, 'has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', config[env].mysql, err);
        //logger.error('Unable to connect to the database:', config[env].mariadb, err);
    });
module.exports = sequelize;