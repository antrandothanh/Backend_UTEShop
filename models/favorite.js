const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Favorite = sequelize.define("favorite", {
    
}, {
    timestamps: false
});

module.exports = Favorite;