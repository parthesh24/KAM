const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Lead = require('./Lead');

const CallPlanning = sequelize.define('CallPlanning', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    leadId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Lead, key: 'id' } },
    callFrequency: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 7 },
    lastCallDate: { type: DataTypes.DATE, defaultValue: null },
}, { timestamps: true });

module.exports = CallPlanning;
