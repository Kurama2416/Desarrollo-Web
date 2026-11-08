const express = require('express');
const router = express.Router();

const adminUsersController = require('../controllers/adminUsersController');
const adminOnly = require('../middlewares/adminOnly');
const {
  adminCreateUserValidations,
  adminUpdateUserValidations
} = require('../middlewares/validations/userValidations');

// Todas las rutas requieren permisos de administrador.
router.use(adminOnly);

// Consultar todos los usuarios
router.get('/', adminUsersController.index);

// Mostrar formulario de creación
router.get('/crear', adminUsersController.createForm);

// Guardar usuario nuevo (validado con express-validator)
router.post('/', adminCreateUserValidations, adminUsersController.store);

// Mostrar formulario de edición
router.get('/:id/editar', adminUsersController.editForm);

// Ver detalle de un usuario
router.get('/:id', adminUsersController.detail);

// Actualizar usuario (validado con express-validator)
router.put('/:id', adminUpdateUserValidations, adminUsersController.update);

// Eliminar usuario
router.delete('/:id', adminUsersController.destroy);

module.exports = router;
