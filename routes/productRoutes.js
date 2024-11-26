const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.createProduct);

router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProductById);

router.put('/products/:productId', productController.updateProduct);

router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
