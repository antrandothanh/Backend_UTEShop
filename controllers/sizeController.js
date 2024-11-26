const { Size } = require("../models");

exports.createSize = async (req, res) => {
    try {
        const { name } = req.body;
        const size = await Size.create({ name });
        res.status(201).json(size);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getSizes = async (req, res) => {
    try {
        const sizes = await Size.findAll();
        res.status(200).json(sizes);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

exports.getSizeById = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;
        const size = await Size.findByPk(sizeId);
        if (!size) return res.status(404).json({message: 'Size not found'});
        res.status(200).json(size);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

exports.deleteSize = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;
        
        // find product
        const size = await Size.findByPk(sizeId);
        if (!size) return res.status(404).json({message: 'Size not found'});

        // Delete product
        await size.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}