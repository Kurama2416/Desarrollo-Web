const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productos', productController.index);
router.get('/productos/crear', productController.createForm);
router.post('/productos', productController.store);
router.get('/productos/:id/editar', productController.editForm);
router.post('/productos/:id/editar', productController.update);

module.exports = router;