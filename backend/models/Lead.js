const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const KAM = require('./KAM');

const Lead = sequelize.define('Lead', {
    name: { type: DataTypes.STRING, allowNull: false },
    restaurantName : {type: DataTypes.STRING, allowNull: false},
    address: { type: DataTypes.STRING },
    contactNumber: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('New', 'Active', 'Inactive'), defaultValue: 'New' },
    callFrequency: { type: DataTypes.INTEGER, defaultValue: 7 },
    lastCallDate: { type: DataTypes.DATE },
}, { 
    timestamps: true,
});

Lead.belongsTo(KAM, { foreignKey: 'kam_id', as: 'assignedKAM'});

module.exports = Lead;