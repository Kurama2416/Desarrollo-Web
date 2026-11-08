const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadAvatar = require('../middlewares/uploadAvatar');
const { guestOnly, authOnly } = require('../middlewares/auth');

// Solo huéspedes: si ya hay sesión, redirigen al perfil
router.get('/registro', guestOnly, authController.registerForm);
router.post('/registro', guestOnly, uploadAvatar, authController.registerSubmit);

router.get('/login', guestOnly, authController.loginForm);
router.post('/login', guestOnly, authController.loginSubmit);

// Solo usuarios: si no hay sesión, redirigen al login
router.post('/logout', authOnly, authController.logout);
router.get('/perfil', authOnly, authController.profile);

module.exports = router;