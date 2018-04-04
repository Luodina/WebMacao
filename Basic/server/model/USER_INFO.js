'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('USER_INFO', {
        USER_ID: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        USER_NAME: {
            type: DataTypes.CHAR(64),
            allowNull: false
        },
        PASSWORD: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            defaultValue: ''
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'USER_INFO'
    });
};