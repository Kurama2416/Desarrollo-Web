const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminOnly = require('../middlewares/adminOnly');
const uploadProductImage = require('../middlewares/uploadProductImage');
const {
  createProductValidations,
  updateProductValidations
} = require('../middlewares/validations/productValidations');

// Este router se monta en /products (ver src/index.js)
// En crear y editar el orden es: sesión → Multer (formulario multipart) → validaciones → controlador

// Públicas: las puede ver cualquiera
router.get('/', productController.index);                        // GET    /products           → listado

// Solo usuarios con sesión (crear, editar y eliminar)
router.get('/create', adminOnly, productController.createForm);   // GET    /products/create    → formulario de creación

// Pública
router.get('/:id', productController.detail);                    // GET    /products/:id       → detalle

// Solo usuarios con sesión
router.post('/', adminOnly, uploadProductImage, createProductValidations, productController.store);        // POST   /products           → crear
router.get('/:id/edit', adminOnly, productController.editForm);   // GET    /products/:id/edit  → formulario de edición
router.put('/:id', adminOnly, uploadProductImage, updateProductValidations, productController.update);     // PUT    /products/:id       → editar
router.delete('/:id', adminOnly, productController.destroy);      // DELETE /products/:id       → eliminar

module.exports = router;
