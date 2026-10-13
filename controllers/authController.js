const data = require('../data/products');

const authController = {
  // ===== Registro =====
  registerForm: (req, res) => {
    res.render('registro', {
      title: 'Crear cuenta | Manglü',
      data,
      errors: {},
      old: {}
    });
  },

  registerSubmit: (req, res) => {
    const { nombre, correo, telefono, password, confirmar, terminos } = req.body;
    const errors = {};

    if (!nombre || nombre.trim().length < 3) {
      errors.nombre = 'Escribe tu nombre completo (mínimo 3 caracteres).';
    }
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errors.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
    }
    if (telefono && !/^\d{10}$/.test(telefono.replace(/\s/g, ''))) {
      errors.telefono = 'El teléfono debe tener 10 dígitos.';
    }
    if (!password || password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (confirmar !== password) {
      errors.confirmar = 'Las contraseñas no coinciden.';
    }
    if (!terminos) {
      errors.terminos = 'Debes aceptar los términos y condiciones.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('registro', {
        title: 'Crear cuenta | Manglü',
        data,
        errors,
        old: { nombre, correo, telefono }
      });
    }

    // Maqueta: aún no se guarda el usuario
    res.redirect('/login');
  },

  // ===== Login (maqueta) =====
  loginForm: (req, res) => {
    res.render('login', {
      title: 'Iniciar sesión | Manglü',
      data,
      errors: {},
      old: {}
    });
  },

  loginSubmit: (req, res) => {
    // Maqueta: no hay autenticación todavía.
    // Se muestra un error de ejemplo para ver cómo se verá el estado de error.
    res.status(401).render('login', {
      title: 'Iniciar sesión | Manglü',
      data,
      errors: { general: 'Correo o contraseña incorrectos. Inténtalo de nuevo.' },
      old: { correo: req.body.correo }
    });
  }
};

module.exports = authController;