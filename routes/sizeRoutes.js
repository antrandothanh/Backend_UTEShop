const express = require("express");
const sizeController = require("../controllers/sizeController");

const router = express.Router();

router.post("/sizes", sizeController.createSize);
// Route để lấy tất cả các kích cỡ
router.get("/sizes", sizeController.getSizes);

// Route để lấy một kích cỡ theo id
router.get("/sizes/:sizeId", sizeController.getSizeById);

// Route để xóa một kích cỡ theo id
router.delete("/sizes/:sizeId", sizeController.deleteSize);

module.exports = router;