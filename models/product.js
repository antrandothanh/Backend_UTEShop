const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: {
        type: DataTypes.BIGINT
    },
    description: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.TEXT },
}, {
    timestamps: false,
});

module.exports = Product;
