
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/carrito', mainController.cart);

router.post('/carrito/agregar', mainController.addToCart);

router.put('/carrito/items/:id', mainController.updateCartItem);

router.delete('/carrito/items/:id', mainController.removeCartItem);

module.exports = router;
