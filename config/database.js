const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ute_shop', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})();

module.exports = sequelize;
