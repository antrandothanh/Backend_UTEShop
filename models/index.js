const sequelize = require('../config/database');
const Category = require('./category');
const Size = require('./size');
const Product = require('./product');
const User = require("./user");
const Favorite = require("./favorite");
const Cart = require('./cart');
const Item = require('./item');

// Associations
Product.belongsToMany(Size, { through: 'product_size', timestamps: false });
Size.belongsToMany(Product, { through: 'product_size', timestamps: false });

Category.hasMany(Product);
Product.belongsTo(Category);
User.hasOne(Favorite);
Favorite.belongsTo(User);
Favorite.belongsToMany(Product, {through: 'favorite_product', timestamps: false});
Product.belongsToMany(Favorite, {through: 'favorite_product', timestamps: false});

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(Item);
Item.belongsTo(Cart);
Product.hasMany(Item);
Item.belongsTo(Product);








module.exports = { sequelize, Category, Size, Product, User, Favorite, Cart, Item };
