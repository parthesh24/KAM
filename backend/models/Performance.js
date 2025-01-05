const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Lead = require('./Lead');

const Performance = sequelize.define('Performance', {
    id: {type: DataTypes.INTEGER, autoIncrement:true, allowNull:false, primaryKey:true},
    leadId : { type: DataTypes.INTEGER, allowNull:false, references:{model:Lead, key:'id'}},
    total_orders: {type:DataTypes.INTEGER, defaultValue:0},
    Last_order_date: {type: DataTypes.DATE}
});

module.exports = Performance;