const { createImageUpload } = require('./imageUpload');

// Foto de perfil: campo "avatar" → public/img/users
module.exports = createImageUpload({
  field: 'avatar',
  folder: 'users',
  prefix: 'user'
});
