const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadAvatar = require('../middlewares/uploadAvatar');
const { guestOnly, authOnly } = require('../middlewares/auth');
const { registerValidations, loginValidations } = require('../middlewares/validations/userValidations');

// Solo huéspedes: si ya hay sesión, redirigen al perfil
router.get('/registro', guestOnly, authController.registerForm);
// Orden: Multer (lee el formulario multipart y la foto) → validaciones → controlador
router.post('/registro', guestOnly, uploadAvatar, registerValidations, authController.registerSubmit);

router.get('/login', guestOnly, authController.loginForm);
router.post('/login', guestOnly, loginValidations, authController.loginSubmit);

// Consulta usada por la validación del front-end (¿ya existe este correo?)
router.get('/api/email-exists', guestOnly, authController.emailExists);

// Solo usuarios: si no hay sesión, redirigen al login
router.post('/logout', authOnly, authController.logout);
router.get('/perfil', authOnly, authController.profile);

module.exports = router;
