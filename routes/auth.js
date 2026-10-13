const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/registro', authController.registerForm);
router.post('/registro', authController.registerSubmit);

router.get('/login', authController.loginForm);
router.post('/login', authController.loginSubmit);

module.exports = router;