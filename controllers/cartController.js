const { Cart, Item, Product, Size, User } = require('../models');

// Thêm sản phẩm vào giỏ hàng
exports.addProductToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, sizeId } = req.body;

        // Tìm người dùng
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Tìm sản phẩm
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Tìm kích cỡ (size)
        const size = await Size.findByPk(sizeId);
        if (!size) {
            return res.status(404).json({ error: 'Size not found' });
        }

        // Tìm hoặc tạo giỏ hàng cho người dùng
        let cart = await Cart.findOne({ where: { userId: userId } });
        if (!cart) {
            cart = await Cart.create({ userId: userId });
        }

        // Kiểm tra xem sản phẩm có cùng size đã có trong giỏ hàng chưa
        let item = await Item.findOne({ where: { cartId: cart.id, productId: productId, sizeId: sizeId } });

        if (item) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            item.quantity += quantity;
            await item.save();
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới một mục
            item = await Item.create({ cartId: cart.id, productId: productId, sizeId: sizeId, quantity: quantity });
        }

        res.status(200).json({ message: 'Product added to cart', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Tìm người dùng
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Tìm giỏ hàng của người dùng và bao gồm thông tin sản phẩm và kích cỡ
        const cart = await Cart.findOne({
            where: { userId: userId },
            include: {
                model: Item,
                include: [
                    Product, // Bao gồm thông tin sản phẩm
                    Size     // Bao gồm thông tin kích cỡ
                ]
            }
        });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật số lượng và kích thước sản phẩm trong giỏ hàng
exports.updateItemInCart = async (req, res) => {
    try {
        const { itemId, quantity, sizeId } = req.body;

        // Tìm mục sản phẩm trong giỏ hàng bằng itemId
        const item = await Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Cập nhật số lượng và kích thước
        if (quantity !== undefined) {
            item.quantity = quantity;
        }
        if (sizeId !== undefined) {
            item.sizeId = sizeId;
        }

        // Lưu lại các thay đổi
        await item.save();

        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa một mục sản phẩm khỏi giỏ hàng
exports.deleteItemFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        // Tìm item trong giỏ hàng
        const item = await Item.findByPk(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Xóa item khỏi cơ sở dữ liệu
        await item.destroy();

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};