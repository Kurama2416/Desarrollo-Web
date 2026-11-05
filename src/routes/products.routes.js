const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authOnly } = require('../middlewares/auth');

// Este router se monta en /products (ver src/index.js)

// Públicas: las puede ver cualquiera
router.get('/', productController.index);                        // GET    /products           → listado

// Solo usuarios con sesión (crear, editar y eliminar)
router.get('/create', authOnly, productController.createForm);   // GET    /products/create    → formulario de creación

// Pública
router.get('/:id', productController.detail);                    // GET    /products/:id       → detalle

// Solo usuarios con sesión
router.post('/', authOnly, productController.store);             // POST   /products           → crear
router.get('/:id/edit', authOnly, productController.editForm);   // GET    /products/:id/edit  → formulario de edición
router.put('/:id', authOnly, productController.update);          // PUT    /products/:id       → editar
router.delete('/:id', authOnly, productController.destroy);      // DELETE /products/:id       → eliminar

module.exports = router;