const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    'KAM_System', 
    process.env.ROOT, 
    process.env.PASSWORD, 
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    }
);

module.exports = sequelize;