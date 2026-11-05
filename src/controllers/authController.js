
const fs = require('fs');
const userModel = require('../models/userModel');

function removeUploadedFile(file) {
  if (file && file.path) {
    try {
      fs.rmSync(file.path, { force: true });
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  }
}

const roleLabels = {
  admin: 'Administrador',
  customer: 'Cliente'
};

const authController = {

  // ===== REGISTRO =====

  registerForm: (req, res) => {
    res.render('registro', {
      title: 'Crear cuenta | Manglü',
      errors: {},
      old: {}
    });
  },

  registerSubmit: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      terms
    } = req.body;

    const errors = {};

    if (!firstName || firstName.trim().length < 2) {
      errors.firstName = 'Escribe tu nombre (mínimo 2 caracteres).';
    }

    if (!lastName || lastName.trim().length < 2) {
      errors.lastName = 'Escribe tu apellido (mínimo 2 caracteres).';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
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

    try {
      if (!errors.email) {
        const existingUser = await userModel.findByEmail(email);

        if (existingUser) {
          errors.email = 'Ya existe una cuenta con ese correo.';
        }
      }

      if (Object.keys(errors).length > 0) {
        removeUploadedFile(req.file);

        return res.status(400).render('registro', {
          title: 'Crear cuenta | Manglü',
          errors,
          old: { firstName, lastName, email }
        });
      }

      await userModel.create({
        firstName,
        lastName,
        email,
        password,
        image: req.file
          ? `/images/users/${req.file.filename}`
          : undefined
      });

      return res.redirect('/login?registered=1');

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      removeUploadedFile(req.file);

      const duplicateEmail =
        error.name === 'SequelizeUniqueConstraintError';

      return res.status(duplicateEmail ? 400 : 500).render('registro', {
        title: 'Crear cuenta | Manglü',
        errors: duplicateEmail
          ? { email: 'Ya existe una cuenta con ese correo.' }
          : { general: 'No se pudo crear la cuenta. Inténtalo nuevamente.' },
        old: { firstName, lastName, email }
      });
    }
  },

  // ===== INICIO DE SESIÓN =====

  loginForm: (req, res) => {
    res.render('login', {
      title: 'Iniciar sesión | Manglü',
      registered: req.query.registered === '1',
      errors: {},
      old: {}
    });
  },

  loginSubmit: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.authenticate(email, password);

      if (!user) {
        return res.status(401).render('login', {
          title: 'Iniciar sesión | Manglü',
          registered: false,
          errors: {
            general: 'Correo o contraseña incorrectos. Inténtalo de nuevo.'
          },
          old: { email }
        });
      }

      req.session.regenerate((error) => {
        if (error) {
          console.error('Error al generar sesión:', error);
          return res.status(500).send('No se pudo iniciar la sesión.');
        }

        req.session.user = userModel.toSession(user);

        req.session.save((saveError) => {
          if (saveError) {
            console.error('Error al guardar sesión:', saveError);
            return res.status(500).send('No se pudo guardar la sesión.');
          }

          return res.redirect('/');
        });
      });

    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      return res.status(500).render('login', {
        title: 'Iniciar sesión | Manglü',
        registered: false,
        errors: {
          general: 'Ocurrió un error al iniciar sesión. Inténtalo nuevamente.'
        },
        old: { email }
      });
    }
  },

  // ===== CERRAR SESIÓN =====

  logout: (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error('Error al cerrar sesión:', error);
        return res.status(500).send('No se pudo cerrar la sesión.');
      }

      res.clearCookie('connect.sid');
      res.clearCookie('manglu_remember');

      return res.redirect('/');
    });
  },

  // ===== PERFIL =====

  profile: async (req, res) => {
    if (!req.session?.user?.id) {
      return res.redirect('/login');
    }

    try {
      const user = await userModel.findById(req.session.user.id);

      if (!user) {
        return req.session.destroy(() => res.redirect('/login'));
      }

      const profile = userModel.toSession(user);

      return res.render('perfil', {
        title: `${profile.firstName} ${profile.lastName} | Manglü`,
        profile,
        roleLabel: roleLabels[profile.category] || 'Cliente'
      });

    } catch (error) {
      console.error('Error al cargar perfil:', error);
      return res.status(500).send('No se pudo cargar el perfil.');
    }
  }
};

module.exports = authController;
