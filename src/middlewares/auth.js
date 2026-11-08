
const { User } = require('../../models');

// Comprueba que el usuario de la sesión exista en MySQL.
const loadUser = async (req, res, next) => {
  try {
    res.locals.user = null;

    if (!req.session?.user?.id) {
      return next();
    }

    const user = await User.findByPk(req.session.user.id);

    if (!user) {
      // La sesión puede pertenecer a un usuario del antiguo JSON.
      delete req.session.user;
      return next();
    }

    const sessionUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      category: user.category,
      image: user.image
    };

    req.session.user = sessionUser;
    res.locals.user = sessionUser;

    return next();

  } catch (error) {
    console.error('Error al verificar usuario:', error);
    return next(error);
  }
};

// Solo permite entrar a visitantes sin sesión.
const guestOnly = (req, res, next) => {
  if (req.session?.user) {
    return res.redirect('/perfil');
  }

  return next();
};

// Solo permite entrar a usuarios autenticados.
const authOnly = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect('/login');
  }

  return next();
};

module.exports = {
  loadUser,
  guestOnly,
  authOnly
};
