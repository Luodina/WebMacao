'use strict';
let Sequelize = require('sequelize');
let config = require('./config');
let env = config.env || 'dev';
let sequelize = new Sequelize(config[env].db, { logging: true });
// use log helper
//let logger = require('./utils/log')('sequelize.js');
// const models = {
//     Users: sequelize.import('./model/USERS'),
//     RegPeople: sequelize.import('./model/REG_PEOPLE')
// };
// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

sequelize.authenticate()
    .then(() => {
        console.log('Connection to', config[env].db, ' has been established successfully.');
        //logger.debug('Connection to', config[env].mariadb, 'has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', config[env].db, err);
        //logger.error('Unable to connect to the database:', config[env].mariadb, err);
    });
module.exports = sequelize;
// export default models;