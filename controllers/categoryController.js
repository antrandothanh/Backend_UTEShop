const { Category } = require("../models");

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name'], // Chỉ lấy các cột cần thiết
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Lấy danh mục bằng id
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            attributes: ['id', 'name'], // Chỉ lấy các cột cần thiết
        });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Category name is required" });
        }

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Cập nhật tên danh mục
        category.name = name;
        await category.save();

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Xóa danh mục
        await category.destroy();

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};