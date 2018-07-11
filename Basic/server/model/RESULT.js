'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RESULT', {
        _ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        TASK_ID: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        IMAGE_ID: { // if null unregistered
            type: DataTypes.CHAR(32),
            allowNull: true
        },
        IMAGE_URL: {
            type: DataTypes.CHAR(32),
        },
        IMAGE_HEIGHT: {
            type: DataTypes.INTEGER
        },
        IMAGE_WIDTH: {
            type: DataTypes.INTEGER
        },
        IMAGE_FILE: {
            type: DataTypes.BLOB
        },
        SIMILARITY: {
            type: DataTypes.FLOAT
        },
        QUALITY_SCORE: {
            type: DataTypes.FLOAT
        },
        IMAGE_MODE: {
            type: DataTypes.INTEGER
        },
        TYPE: {
            type: DataTypes.INTEGER
        },
        TRACKIDX: {
            type: DataTypes.CHAR(32),
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
        tableName: 'RESULT'
    });
};