'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('REG_PEOPLE', {
        _ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        PERSONNAME: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        ALTNAME: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        SEX: {
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        NATIONALITY: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        REMARKS: {
            type: DataTypes.CHAR(100),
            allowNull: false
        },
        NAME: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        IMAGE: {
            type: DataTypes.BLOB, //Buffer,
            allowNull: false
        },
        IMAGEID: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        PERSONID: {
            type: DataTypes.CHAR(32),
            allowNull: false
        },
        FEATURE: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        CREATE_DATE: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        UPDATE_DATE: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'REG_PEOPLE'
    });
};