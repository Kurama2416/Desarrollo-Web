// Deja disponibles en TODAS las vistas los datos y funciones que se repiten
const site = require('../database/site.json');

// "$8.000"
const formatPrice = (value) => '$' + Number(value).toLocaleString('es-CO');

// Color de la etiqueta según la categoría (clases .tag-* del CSS)
const categoryColors = { Granizados: 'yellow', Frutas: 'green', Toppings: 'purple' };
const tagColor = (category) => categoryColors[category] || 'yellow';

module.exports = (req, res, next) => {
  res.locals.data = site;                                        // textos del sitio (menú, footer, etc.)
  res.locals.formatPrice = formatPrice;
  res.locals.tagColor = tagColor;
  res.locals.wppLink = `https://wa.me/${site.empresa.telefonoWhatsApp}`;
  next();
};