const { createImageUpload } = require('./imageUpload');

// Imagen de producto: campo "image" → public/img/products
module.exports = createImageUpload({
  field: 'image',
  folder: 'products',
  prefix: 'product'
});
