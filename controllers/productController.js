const { Product, Category, Size } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, color, imageUrl, categoryId, sizes } = req.body;

        // Create product
        const product = await Product.create({ name, price, description, color, imageUrl, categoryId });

        // Associate sizes
        if (sizes && sizes.length > 0) {
            // Fetch all size instances that match the given IDs
            const sizeInstances = await Size.findAll({
                where: {
                    id: sizes.map(size => size.id) // Extract IDs from the sizes array
                }
            });

            // Associate all the sizes with the product
            await product.setSizes(sizeInstances);
        }


        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category }, // Include Category
                { model: Size }      // Include Sizes
            ],
            attributes: ['id', 'name', 'price', 'description', 'color', 'imageUrl'], // Product fields
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId, {
            include: [
                Category,
                Size
            ],
            attributes: ['id', 'name', 'price', 'description', 'color', 'imageUrl']
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }


        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const {name, price, description, color, imageUrl, categoryId, sizes} = req.body;

        // find product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        // update product properties
        await product.update({name, price, description, color, imageUrl, categoryId});

        // update associated sizes
        if (sizes && sizes.length > 0) {
            // find size in Size table
            const sizeInstances = await Size.findAll({
                where: { id: sizes.map(size => size.id) },
            });

            // Set the new sizes to product
            await product.setSizes(sizeInstances);
        } else {
            // Clear all sizes if none are provided
            await product.setSizes([]);
        }

        res.status(200).json(product);


    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        
        // find product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        // Clear all sizes of product
        await product.setSizes([]);

        // Delete product
        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
