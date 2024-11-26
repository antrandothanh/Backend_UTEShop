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