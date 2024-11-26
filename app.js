const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require("./routes/categoryRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", sizeRoutes);
app.use("/api", favoriteRoutes);

// Sync Database
(async () => {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
})();

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));