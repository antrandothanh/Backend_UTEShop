const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Size = sequelize.define('size', {
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
});

module.exports = Size;
