'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RESULT_RT', {
        _ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        TASKID: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        IMAGEID: { // if null unregistered
            type: DataTypes.CHAR(32),
            allowNull: true
        },
        IMAGEURL: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        IMAGE_HEIGHT: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        IMAGE_WIDTH: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        IMAGE_FILE: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        SIMILARITY: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        QUALITYSCORE: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        IMAGEMODE: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TYPE: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TRACKIDX: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        RESULTIDX: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        FRAMEIDX: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        REC_TIME: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'RESULT_RT'
    });
};