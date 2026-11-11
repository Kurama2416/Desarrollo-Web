const { body } = require('express-validator');
const { Category, Size } = require('../../../models');
const { imageRule } = require('./helpers');

// Reglas comunes de creación y edición de productos.
// La imagen cambia: al crear es obligatoria; al editar es opcional
// (si no se sube otra, se conserva la actual).
const baseRules = () => [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.').bail()
    .isLength({ max: 150 }).withMessage('El nombre no puede superar los 150 caracteres.'),

  body('description')
    .trim()
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),

  body('price')
    .trim()
    .notEmpty().withMessage('El precio es obligatorio.').bail()
    .isFloat({ gt: 0, max: 99999999.99 }).withMessage('Ingresa un precio válido, mayor que 0.'),

  // Tablas secundarias: el valor debe existir en la base de datos.
  body('category')
    .trim()
    .notEmpty().withMessage('Elige una categoría.').bail()
    .custom(async (name) => {
      const category = await Category.findOne({ where: { name } });
      if (!category) {
        throw new Error('La categoría elegida no existe.');
      }
      return true;
    }),

  // Se lee req.body.sizes directamente: con un checkbox llega un texto, con
  // varios llega un arreglo.
  body('sizes').custom(async (_value, { req }) => {
    const sizes = [].concat(req.body.sizes ?? []).map(String);

    if (sizes.length === 0) {
      throw new Error('Elige al menos un tamaño.');
    }

    const found = await Size.count({ where: { name: [...new Set(sizes)] } });
    if (found !== new Set(sizes).size) {
      throw new Error('Alguno de los tamaños elegidos no existe.');
    }

    return true;
  })
];

const createProductValidations = [
  ...baseRules(),
  body('image').custom(imageRule({
    required: true,
    requiredMessage: 'Selecciona una imagen del producto (JPG, JPEG, PNG o GIF).'
  }))
];

const updateProductValidations = [
  ...baseRules(),
  body('image').custom(imageRule({ required: false }))
];

module.exports = { createProductValidations, updateProductValidations };
