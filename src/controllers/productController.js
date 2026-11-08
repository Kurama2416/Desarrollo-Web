
const path = require('path');
const db = require('../../models');

const { Product, Category, Size, sequelize, Sequelize } = db;
const { Op } = Sequelize;

const { getErrors, removeUploadedFile } = require('../middlewares/validations/helpers');

// Carpeta pública de las imágenes que sube el formulario
const UPLOADS_URL = '/img/products/';

// Opciones de los formularios: salen de la base de datos, así el formulario
// siempre ofrece las mismas categorías y tamaños que el validador acepta.
async function getFormData() {
  const [categoryRows, sizeRows] = await Promise.all([
    Category.findAll({ order: [['id', 'ASC']] }),
    Size.findAll({ order: [['id', 'ASC']] })
  ]);

  return {
    categories: categoryRows.map(c => c.name),
    sizeOptions: sizeRows.map(s => s.name)
  };
}

// Datos del formulario ya validados y limpiados por express-validator
function parseBody(body) {
  return {
    name: String(body.name ?? '').trim(),
    description: String(body.description ?? '').trim(),
    category: String(body.category ?? '').trim(),
    sizes: [...new Set(
      [].concat(body.sizes ?? []).map(s => String(s))
    )],
    price: Number(body.price)
  };
}

// Borra del disco una imagen subida por el formulario (nunca las de /img/*.jpg del catálogo inicial)
function removeStoredImage(imageUrl) {
  if (typeof imageUrl !== 'string' || !imageUrl.startsWith(UPLOADS_URL)) return;

  removeUploadedFile({
    path: path.join(__dirname, '..', '..', 'public', imageUrl)
  });
}

// Obtener producto con categoría y tamaños
async function findProduct(id) {
  const product = await Product.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      {
        model: Size,
        as: 'sizes',
        through: { attributes: [] }
      }
    ]
  });

  return product ? formatProduct(product) : null;
}

// Mantener el formato que esperan las vistas EJS
function formatProduct(product) {
  const data = product.get({ plain: true });

  return {
    ...data,
    category: data.category?.name ?? '',
    sizes: data.sizes?.map(size => size.name) ?? [],
    price: Number(data.price)
  };
}

// Buscar categoría y tamaños válidos
async function findRelations(data, transaction) {
  const category = await Category.findOne({
    where: { name: data.category },
    transaction
  });

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  const sizes = await Size.findAll({
    where: { name: { [Op.in]: data.sizes } },
    transaction
  });

  if (sizes.length !== data.sizes.length) {
    throw new Error('Uno o más tamaños no existen');
  }

  return { category, sizes };
}

const productController = {

  // GET /products

  index: async (req, res) => {
    try {
      // Obtener el texto escrito en la búsqueda
      const search = String(req.query.search ?? '').trim();

      // Filtrar productos por nombre cuando exista una búsqueda
      const where = search
        ? { name: { [Op.like]: `%${search}%` } }
        : {};

      const productsDB = await Product.findAll({
        where,
        include: [
          { model: Category, as: 'category' },
          {
            model: Size,
            as: 'sizes',
            through: { attributes: [] }
          }
        ],
        order: [['id', 'ASC']]
      });

      res.render('index', {
        title: 'Productos | Manglü',
        products: productsDB.map(formatProduct),
        search
      });

    } catch (error) {
      console.error('Error al buscar productos:', error);
      res.status(500).send('Error al cargar los productos');
    }
  },


  // GET /products/:id
  detail: async (req, res) => {
    try {
      const product = await findProduct(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const relatedDB = await Product.findAll({
        where: { id: { [Op.ne]: product.id } },
        include: [
          { model: Category, as: 'category' },
          {
            model: Size,
            as: 'sizes',
            through: { attributes: [] }
          }
        ],
        order: [['id', 'ASC']],
        limit: 3
      });

      res.render('detail', {
        title: `${product.name} | Manglü`,
        product,
        related: relatedDB.map(formatProduct)
      });

    } catch (error) {
      console.error('Error al mostrar producto:', error);
      res.status(500).send('Error al cargar el producto');
    }
  },

  // GET /products/create
  createForm: async (req, res) => {
    try {
      res.render('create', {
        title: 'Nuevo producto | Manglü',
        ...(await getFormData()),
        errors: {},
        old: { sizes: [] }
      });
    } catch (error) {
      console.error('Error al abrir el formulario:', error);
      res.status(500).send('Error al cargar el formulario');
    }
  },

  // POST /products
  // Antes de llegar acá pasaron Multer y createProductValidations.
  store: async (req, res) => {
    try {
      const data = parseBody(req.body);
      const errors = getErrors(req);

      if (Object.keys(errors).length > 0) {
        removeUploadedFile(req.file);

        return res.status(400).render('create', {
          title: 'Nuevo producto | Manglü',
          ...(await getFormData()),
          errors,
          old: { ...data, price: req.body.price ?? '' }
        });
      }

      await sequelize.transaction(async transaction => {
        const { category, sizes } =
          await findRelations(data, transaction);

        const product = await Product.create({
          name: data.name,
          description: data.description,
          image: `${UPLOADS_URL}${req.file.filename}`,
          price: data.price,
          category_id: category.id
        }, { transaction });

        await product.addSizes(sizes, { transaction });
      });

      res.redirect('/products');

    } catch (error) {
      console.error('Error al crear producto:', error);
      removeUploadedFile(req.file);
      res.status(500).send('Error al guardar el producto');
    }
  },

  // GET /products/:id/edit
  editForm: async (req, res) => {
    try {
      const product = await findProduct(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      res.render('edit', {
        title: `Editar ${product.name} | Manglü`,
        ...(await getFormData()),
        product,
        errors: {},
        old: product
      });

    } catch (error) {
      console.error('Error al abrir edición:', error);
      res.status(500).send('Error al cargar el formulario');
    }
  },

  // PUT /products/:id
  // Antes de llegar acá pasaron Multer y updateProductValidations.
  update: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        removeUploadedFile(req.file);
        return res.status(404).send('Producto no encontrado');
      }

      const data = parseBody(req.body);
      const errors = getErrors(req);

      if (Object.keys(errors).length > 0) {
        removeUploadedFile(req.file);

        return res.status(400).render('edit', {
          title: `Editar ${product.name} | Manglü`,
          ...(await getFormData()),
          product: await findProduct(product.id),
          errors,
          old: { ...data, price: req.body.price ?? '' }
        });
      }

      const previousImage = product.image;

      await sequelize.transaction(async transaction => {
        const { category, sizes } =
          await findRelations(data, transaction);

        await product.update({
          name: data.name,
          description: data.description,
          // Si no se subió otra imagen, se conserva la actual
          image: req.file ? `${UPLOADS_URL}${req.file.filename}` : previousImage,
          price: data.price,
          category_id: category.id
        }, { transaction });

        await product.setSizes(sizes, { transaction });
      });

      // Ya se guardó la nueva: se borra la anterior para no acumular archivos
      if (req.file) removeStoredImage(previousImage);

      res.redirect('/products');

    } catch (error) {
      console.error('Error al actualizar producto:', error);
      removeUploadedFile(req.file);
      res.status(500).send('Error al actualizar el producto');
    }
  },

  // DELETE /products/:id
  destroy: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const image = product.image;
      await product.destroy();
      removeStoredImage(image);

      res.redirect('/products');

    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).send(
        'No se pudo eliminar el producto. Puede estar asociado a un carrito.'
      );
    }
  }
};

module.exports = productController;
