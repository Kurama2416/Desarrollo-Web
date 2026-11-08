const fs = require('fs');
const userModel = require('../models/userModel');

// Borra del disco la foto subida cuando el registro no se completa
function removeUploadedFile(file) {
  if (file && file.path) fs.rmSync(file.path, { force: true });
}

// Cómo se muestra la categoría del usuario
const roleLabels = { admin: 'Administrador', customer: 'Cliente' };

const authController = {
  // ===== Registro =====
  registerForm: (req, res) => {
    res.render('registro', {
      title: 'Crear cuenta | Manglü',
      errors: {},
      old: {}
    });
  },

  registerSubmit: (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, terms } = req.body;
    const errors = {};

    if (!firstName || firstName.trim().length < 2) {
      errors.firstName = 'Escribe tu nombre (mínimo 2 caracteres).';
    }
    if (!lastName || lastName.trim().length < 2) {
      errors.lastName = 'Escribe tu apellido (mínimo 2 caracteres).';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
    } else if (userModel.findByEmail(email)) {
      errors.email = 'Ya existe una cuenta con ese correo.';
    }
    if (!password || password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (!terms) {
      errors.terms = 'Debes aceptar los términos y condiciones.';
    }
    if (req.fileError) {
      errors.avatar = req.fileError;
    }

    if (Object.keys(errors).length > 0) {
      removeUploadedFile(req.file); // no dejar fotos huérfanas si el registro falla
      return res.status(400).render('registro', {
        title: 'Crear cuenta | Manglü',
        errors,
        old: { firstName, lastName, email } // las contraseñas nunca se devuelven al formulario
      });
    }

    userModel.create({
      firstName,
      lastName,
      email,
      password,
      image: req.file ? `/images/users/${req.file.filename}` : undefined
    });

    res.redirect('/login?registered=1');
  },

  // ===== Login =====
  loginForm: (req, res) => {
    res.render('login', {
      title: 'Iniciar sesión | Manglü',
      registered: req.query.registered === '1', // viene del registro
      errors: {},
      old: {}
    });
  },

  loginSubmit: (req, res) => {
    const { email, password } = req.body;
    const user = userModel.authenticate(email, password);

    // Mismo mensaje si falla el correo o la contraseña: no se revela cuál de los dos es
    if (!user) {
      return res.status(401).render('login', {
        title: 'Iniciar sesión | Manglü',
        registered: false,
        errors: { general: 'Correo o contraseña incorrectos. Inténtalo de nuevo.' },
        old: { email }
      });
    }

    // Se genera una sesión nueva al iniciar sesión (evita la fijación de sesión)
    req.session.regenerate((err) => {
      if (err) return res.status(500).send('No se pudo iniciar la sesión.');

      req.session.user = userModel.toSession(user); // sin la contraseña
      req.session.save(() => res.redirect('/'));
    });
  },

  // ===== Logout =====
  logout: (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');      // cookie de la sesión
      res.clearCookie('manglu_remember');  // cookie de "recordarme" (paso 8)
      res.redirect('/');
    });
  },

  // ===== Perfil =====
  profile: (req, res) => {
    // Se leen los datos actuales del archivo (no los de la sesión)
    const user = userModel.findById(req.session.user.id);
    if (!user) {
      // El usuario ya no existe en users.json: se cierra la sesión
      return req.session.destroy(() => res.redirect('/login'));
    }

    const profile = userModel.toSession(user); // sin la contraseña

    res.render('perfil', {
      title: `${profile.firstName} ${profile.lastName} | Manglü`,
      profile,
      roleLabel: roleLabels[profile.category] || 'Cliente'
    });
  }
};

module.exports = authController;