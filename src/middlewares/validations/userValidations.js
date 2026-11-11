const { body } = require('express-validator');
const { User } = require('../../../models');
const { STRONG_PASSWORD, STRONG_PASSWORD_MESSAGE, imageRule } = require('./helpers');

const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase();

// ¿Hay un usuario con ese correo? (opcionalmente se ignora a un usuario por ID)
async function emailInUse(email, exceptId) {
  const user = await User.findOne({ where: { email: normalizeEmail(email) } });
  return Boolean(user) && Number(user.id) !== Number(exceptId);
}

// ===== Reglas reutilizables =====

const nameRule = (field, label) =>
  body(field)
    .trim()
    .notEmpty().withMessage(`${label} es obligatorio.`).bail()
    .isLength({ min: 2 }).withMessage(`${label} debe tener al menos 2 caracteres.`).bail()
    .isLength({ max: 100 }).withMessage(`${label} no puede superar los 100 caracteres.`);

const emailFormatRule = () =>
  body('email')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio.').bail()
    .isEmail().withMessage('Ingresa un correo válido, por ejemplo nombre@correo.com.').bail()
    .isLength({ max: 255 }).withMessage('El correo no puede superar los 255 caracteres.');

const newPasswordRule = () =>
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail()
    .matches(STRONG_PASSWORD).withMessage(STRONG_PASSWORD_MESSAGE);

// ===== Registro de usuarios (POST /registro) =====
// Requiere que Multer (uploadAvatar) corra antes, porque el formulario es multipart.
const registerValidations = [
  nameRule('firstName', 'El nombre'),
  nameRule('lastName', 'El apellido'),

  emailFormatRule()
    .bail()
    .custom(async (email) => {
      if (await emailInUse(email)) {
        throw new Error('Ya existe una cuenta con ese correo.');
      }
      return true;
    }),

  newPasswordRule(),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden.');
    }
    return true;
  }),

  body('terms').equals('si').withMessage('Debes aceptar los términos y condiciones.'),

  body('avatar').custom(imageRule({ required: false }))
];

// ===== Login (POST /login) =====
// La coincidencia de la contraseña con la guardada en base se comprueba en el
// controlador (bcrypt.compare), porque en la base solo existe el hash.
const loginValidations = [
  emailFormatRule()
    .bail()
    .custom(async (email) => {
      if (!(await emailInUse(email))) {
        throw new Error('No existe una cuenta con ese correo.');
      }
      return true;
    }),

  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
];

// ===== Admin: crear usuario (POST /admin/users) =====
const adminCreateUserValidations = [
  nameRule('firstName', 'El nombre'),
  nameRule('lastName', 'El apellido'),

  emailFormatRule()
    .bail()
    .custom(async (email) => {
      if (await emailInUse(email)) {
        throw new Error('Ya existe un usuario con ese correo.');
      }
      return true;
    }),

  newPasswordRule(),

  body('category').isIn(['admin', 'customer']).withMessage('Selecciona un rol válido.')
];

// ===== Admin: editar usuario (PUT /admin/users/:id) =====
const adminUpdateUserValidations = [
  nameRule('firstName', 'El nombre'),
  nameRule('lastName', 'El apellido'),

  emailFormatRule()
    .bail()
    .custom(async (email, { req }) => {
      if (await emailInUse(email, req.params.id)) {
        throw new Error('Este correo ya está registrado.');
      }
      return true;
    }),

  body('category').isIn(['admin', 'customer']).withMessage('Selecciona un rol válido.')
];

module.exports = {
  registerValidations,
  loginValidations,
  adminCreateUserValidations,
  adminUpdateUserValidations,
  emailInUse
};
