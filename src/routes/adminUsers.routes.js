
const express = require('express');
const router = express.Router();

const adminUsersController = require('../controllers/adminUsersController');
const adminOnly = require('../middlewares/adminOnly');

// Todas las rutas requieren permisos de administrador.
router.use(adminOnly);

// Consultar todos los usuarios
router.get('/', adminUsersController.index);

// Mostrar formulario de creación
router.get('/crear', adminUsersController.createForm);

// Guardar usuario nuevo
router.post('/', adminUsersController.store);

// Mostrar formulario de edición
router.get('/:id/editar', adminUsersController.editForm);

// Ver detalle de un usuario
router.get('/:id', adminUsersController.detail);

// Actualizar usuario
router.put('/:id', adminUsersController.update);

// Eliminar usuario
router.delete('/:id', adminUsersController.destroy);

module.exports = router;
