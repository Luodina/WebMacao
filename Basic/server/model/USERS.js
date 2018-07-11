'use strict';
module.exports = function(sequelize, DataTypes) {
    // console.log(sequelize, DataTypes);
    return sequelize.define('USERS', {
        _ID: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        NAME: {
            type: DataTypes.CHAR(64),
            allowNull: false
        },
        PASSWORD: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            defaultValue: ''
        },
        ROLE: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            defaultValue: 'user'
        },
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'USERS'
    });
};