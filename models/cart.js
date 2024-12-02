const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('cart', {

}, {
    timestamps: false,
});

module.exports = Cart;
