const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

// Route để thêm sản phẩm vào giỏ hàng
router.post("/cart", cartController.addProductToCart);

// Route để lấy giỏ hàng của người dùng
router.get("/cart/:userId", cartController.getCart);

// Route để cập nhật số lượng và kích thước sản phẩm trong giỏ hàng
router.put("/cart/item", cartController.updateItemInCart);

// Route để xóa một mục sản phẩm khỏi giỏ hàng
router.delete("/cart/item", cartController.deleteItemFromCart);

module.exports = router;
