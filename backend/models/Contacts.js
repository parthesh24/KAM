const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/db')
const Lead = require('./Lead')

const Contacts = sequelize.define('Contacts', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    leadId: {type: DataTypes.INTEGER, allowNull: false, references: {model: Lead, key: 'id' }},
    name : {type: DataTypes.STRING, allowNull:false },
    role : {type: DataTypes.STRING},
    phone : {type: DataTypes.STRING},
    email : {type: DataTypes.STRING}
}, {timestamps:true});

module.exports = Contacts;
