// Middleware personalizado: registra en consola cada petición que llega al servidor
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Sin next() la petición se quedaría colgada
};

module.exports = logger;