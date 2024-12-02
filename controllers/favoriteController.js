const { Favorite, Product, User } = require('../models');

exports.addProductToFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find or create the favorite for the user
        let favorite = await Favorite.findOne({ where: { userId: userId } });

        if (!favorite) {
            // If no favorite exists for the user, create one
            favorite = await Favorite.create({
                userId: userId,
            });
        }

        // Check if the product is already in the user's favorites
        const isProductInFavorite = await favorite.hasProduct(product);
        if (isProductInFavorite) {
            return res.status(400).json({ error: 'Product is already in favorites' });
        }

        // Add the product to the favorite
        await favorite.addProduct(product);

        res.status(200).json({ message: 'Product added to favorites', favorite });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProductFromFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the favorite for the user
        let favorite = await Favorite.findOne({ where: { userId: userId } });

        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        // Check if the product is in the user's favorites
        const isProductInFavorite = await favorite.hasProduct(product);
        if (!isProductInFavorite) {
            return res.status(400).json({ error: 'Product not in favorites' });
        }

        // Remove the product from the favorite
        await favorite.removeProduct(product);

        res.status(200).json({ message: 'Product removed from favorites' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
exports.getFavoriteList = async (req, res) => {
    try {
        const { userId } = req.params;

        // Kiểm tra người dùng có tồn tại không
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Tìm danh sách yêu thích của người dùng
        const favorite = await Favorite.findOne({
            where: { userId: userId },
            include: {
                model: Product,
                attributes: ['id', 'name', 'price', 'color', 'imageUrl'], // Chỉ lấy các thông tin cần thiết của sản phẩm
            },
        });

        if (!favorite || favorite.products.length === 0) {
            return res.status(200).json({ message: 'No products in favorite list', products: [] });
        }

        // Trả về danh sách sản phẩm yêu thích
        res.status(200).json({ favoriteId: favorite.id, products: favorite.products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};