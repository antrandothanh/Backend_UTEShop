const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Route để tạo danh mục mới
router.post("/categories", categoryController.createCategory);

// Route để lấy danh sách tất cả danh mục
router.get("/categories", categoryController.getCategories);

// Route để lấy thông tin chi tiết danh mục theo ID
router.get("/categories/:id", categoryController.getCategoryById);

// Route để cập nhật danh mục theo ID
router.put("/categories/:id", categoryController.updateCategory);

// Route để xóa danh mục theo ID
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
