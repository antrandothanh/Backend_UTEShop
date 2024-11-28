const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('item', {
    size: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false}
}, {
    timestamps: false,
});

module.exports = Item;
