const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/producto/:id', mainController.productDetail);
router.get('/carrito', mainController.cart);

module.exports = router;