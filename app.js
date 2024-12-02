const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require("./routes/categoryRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", sizeRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", cartRoutes);

// Sync Database
(async () => {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
})();

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
