'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CAMERA', {
        _ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        NAME: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        LOCATION: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        RTSP: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        RTSPRT: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        STATUS: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        REMARKS: {
            type: DataTypes.CHAR(32),
            allowNull: true
        },
        TASK_ID: {
            type: DataTypes.CHAR(32),
            allowNull: true
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        DEL_DATE: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'CAMERA'
    });
};