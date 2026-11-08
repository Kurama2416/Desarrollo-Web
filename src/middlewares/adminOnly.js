
const adminOnly = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect('/login');
  }

  if (req.session.user.category !== 'admin') {
    return res.status(403).send(
      'Acceso denegado. Esta sección es exclusiva para administradores.'
    );
  }

  next();
};

module.exports = adminOnly;
