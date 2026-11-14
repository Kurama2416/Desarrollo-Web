const userModel = require('../models/userModel');
const { getErrors, removeUploadedFile } = require('../middlewares/validations/helpers');
const { REMEMBER_COOKIE } = require('../middlewares/auth');

const REMEMBER_DAYS = 30;

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
    const { firstName, lastName, email, password } = req.body;
    const errors = getErrors(req);

    if (Object.keys(errors).length > 0) {
      removeUploadedFile(req.file);

      return res.status(400).render('registro', {
        title: 'Crear cuenta | Manglü',
        errors,
        old: { firstName, lastName, email }
      });
    }

    try {
      await userModel.create({
        firstName,
        lastName,
        email,
        password,
        image: req.file
          ? `/img/users/${req.file.filename}`
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
    const errors = getErrors(req);

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('login', {
        title: 'Iniciar sesión | Manglü',
        registered: false,
        errors,
        old: { email }
      });
    }

    try {
      const user = await userModel.authenticate(email, password);

      
      if (!user) {
        return res.status(401).render('login', {
          title: 'Iniciar sesión | Manglü',
          registered: false,
          errors: { password: 'La contraseña es incorrecta.' },
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

          // "Recordarme en este dispositivo": cookie firmada que dura 30 días
          if (req.body.remember === 'si') {
            res.cookie(REMEMBER_COOKIE, String(user.id), {
              signed: true,
              httpOnly: true,
              sameSite: 'lax',
              maxAge: REMEMBER_DAYS * 24 * 60 * 60 * 1000
            });
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

  // ===== CONSULTA DE CORREO  =====
  

  emailExists: async (req, res) => {
    const email = String(req.query.email ?? '').trim();

    if (!email || email.length > 255) {
      return res.status(400).json({ exists: false });
    }

    try {
      const user = await userModel.findByEmail(email);
      return res.json({ exists: Boolean(user) });
    } catch (error) {
      console.error('Error al consultar el correo:', error);
      return res.status(500).json({ exists: false });
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
      res.clearCookie(REMEMBER_COOKIE);

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
