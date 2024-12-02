const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.post('/favorites', favoriteController.addProductToFavorite);

router.delete('/favorites', favoriteController.deleteProductFromFavorite);

router.get("/favorites/:userId", favoriteController.getFavoriteList);

module.exports = router;