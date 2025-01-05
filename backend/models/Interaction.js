const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Lead = require('./Lead');

const Interaction = sequelize.define('Interaction', {
    id: {type: DataTypes.INTEGER, autoIncrement:true,allowNull:false, primaryKey:true},
    leadId: {type: DataTypes.INTEGER, allowNull: false, references: {model: Lead, key: 'id' }},
    type: { type: DataTypes.ENUM('Call', 'Order'), allowNull:false},
    notes: {type: DataTypes.TEXT},
    interaction_date: {type: DataTypes.DATE, allowNull:false},
    follow_up_required: {type: DataTypes.BOOLEAN, defaultValue:false},
}, {timestamps:true});

module.exports = Interaction;