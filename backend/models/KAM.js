const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KAM = sequelize.define('KAM', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password : { type: DataTypes.TEXT, allowNull:false},
    phone: { type: DataTypes.STRING, allowNull: false },
}, {timestamps: true});

module.exports = KAM;