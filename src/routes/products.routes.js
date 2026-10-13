const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Este router se monta en /products (ver src/index.js)

router.get('/', productController.index);              // GET    /products           → listado
router.get('/create', productController.createForm);   // GET    /products/create    → formulario de creación
router.get('/:id', productController.detail);          // GET    /products/:id       → detalle
router.post('/', productController.store);             // POST   /products           → crear
router.get('/:id/edit', productController.editForm);   // GET    /products/:id/edit  → formulario de edición
router.put('/:id', productController.update);          // PUT    /products/:id       → editar
router.delete('/:id', productController.destroy);      // DELETE /products/:id       → eliminar

module.exports = router;