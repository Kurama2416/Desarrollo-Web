
const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const normalizeEmail = (email) =>
  String(email ?? '').trim().toLowerCase();

const adminUsersController = {

  // Mostrar todos los usuarios
  index: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password']
        },
        order: [['id', 'ASC']]
      });

      res.render('admin/users/index', {
        title: 'Administrar usuarios | Manglü',
        users
      });

    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.status(500).send('Error al consultar usuarios.');
    }
  },

  // Mostrar el detalle de un usuario
  detail: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password']
        }
      });

      if (!user) {
        return res.status(404).send('Usuario no encontrado.');
      }

      res.render('admin/users/detail', {
        title: 'Detalle de usuario | Manglü',
        selectedUser: user
      });

    } catch (error) {
      console.error('Error al consultar el usuario:', error);
      res.status(500).send('Error al cargar el detalle del usuario.');
    }
  },

  // Formulario para crear un usuario
  createForm: (req, res) => {
    res.render('admin/users/form', {
      title: 'Crear usuario | Manglü',
      user: null,
      action: '/admin/users',
      buttonText: 'Crear usuario',
      errors: {}
    });
  },

  // Guardar usuario nuevo
  store: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      category
    } = req.body;

    const errors = {};

    if (!firstName?.trim() || firstName.trim().length < 2) {
      errors.firstName = 'Ingresa un nombre válido.';
    }

    if (!lastName?.trim() || lastName.trim().length < 2) {
      errors.lastName = 'Ingresa un apellido válido.';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!password || password.length < 8) {
      errors.password = 'La contraseña debe tener mínimo 8 caracteres.';
    }

    if (!['admin', 'customer'].includes(category)) {
      errors.category = 'Selecciona una categoría válida.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).render('admin/users/form', {
        title: 'Crear usuario | Manglü',
        user: { firstName, lastName, email, category },
        action: '/admin/users',
        buttonText: 'Crear usuario',
        errors
      });
    }

    try {
      const existingUser = await User.findOne({
        where: {
          email: normalizeEmail(email)
        }
      });

      if (existingUser) {
        return res.status(400).render('admin/users/form', {
          title: 'Crear usuario | Manglü',
          user: { firstName, lastName, email, category },
          action: '/admin/users',
          buttonText: 'Crear usuario',
          errors: {
            email: 'Ya existe un usuario con ese correo.'
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizeEmail(email),
        password: hashedPassword,
        category,
        image: '/images/users/default.svg'
      });

      res.redirect('/admin/users');

    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).send('No se pudo crear el usuario.');
    }
  },

  // Formulario para editar un usuario
  editForm: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password']
        }
      });

      if (!user) {
        return res.status(404).send('Usuario no encontrado.');
      }

      res.render('admin/users/form', {
        title: 'Editar usuario | Manglü',
        user,
        action: `/admin/users/${user.id}?_method=PUT`,
        buttonText: 'Guardar cambios',
        errors: {}
      });

    } catch (error) {
      console.error('Error al cargar usuario:', error);
      res.status(500).send('Error al cargar el usuario.');
    }
  },

  // Actualizar usuario
  update: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).send('Usuario no encontrado.');
      }

      const {
        firstName,
        lastName,
        email,
        category
      } = req.body;

      const errors = {};

      if (!firstName?.trim() || firstName.trim().length < 2) {
        errors.firstName = 'Ingresa un nombre válido.';
      }

      if (!lastName?.trim() || lastName.trim().length < 2) {
        errors.lastName = 'Ingresa un apellido válido.';
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = 'Ingresa un correo válido.';
      }

      if (!['admin', 'customer'].includes(category)) {
        errors.category = 'Selecciona una categoría válida.';
      }

      // Evita que el administrador cambie su propio rol
      if (
        Number(req.session.user.id) === Number(user.id) &&
        category !== 'admin'
      ) {
        errors.category =
          'No puedes quitarte tu propio rol de administrador.';
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).render('admin/users/form', {
          title: 'Editar usuario | Manglü',
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            category
          },
          action: `/admin/users/${user.id}?_method=PUT`,
          buttonText: 'Guardar cambios',
          errors
        });
      }

      const existingUser = await User.findOne({
        where: {
          email: normalizeEmail(email)
        }
      });

      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).render('admin/users/form', {
          title: 'Editar usuario | Manglü',
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            category
          },
          action: `/admin/users/${user.id}?_method=PUT`,
          buttonText: 'Guardar cambios',
          errors: {
            email: 'Este correo ya está registrado.'
          }
        });
      }

      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizeEmail(email),
        category
      });

      res.redirect('/admin/users');

    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).send('No se pudo actualizar el usuario.');
    }
  },

  // Eliminar usuario
  destroy: async (req, res) => {
    try {
      const userId = Number(req.params.id);

      if (userId === Number(req.session.user.id)) {
        return res.status(403).send(
          'No puedes eliminar tu propia cuenta de administrador.'
        );
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send('Usuario no encontrado.');
      }

      await user.destroy();

      res.redirect('/admin/users');

    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).send('No se pudo eliminar el usuario.');
    }
  }

};

module.exports = adminUsersController;
