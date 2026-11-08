// Middlewares de autenticación.

// Middleware de APLICACIÓN: se ejecuta en cada petición.
// Deja al usuario de la sesión disponible en todas las vistas como "user" (o null si es un huésped).
const loadUser = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};

// Middleware de RUTA: solo para huéspedes (visitantes sin sesión).
// Si ya hay sesión, redirige al perfil.
const guestOnly = (req, res, next) => {
  if (req.session.user) return res.redirect('/perfil');
  next();
};

// Middleware de RUTA: solo para usuarios con sesión.
// Si no hay sesión, redirige al login.
const authOnly = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

module.exports = { loadUser, guestOnly, authOnly };