
const db = require('../../models');

const {
  Product,
  Category,
  Size,
  Cart,
  CartItem,
  ProductSize,
  sequelize
} = db;

function formatProduct(product) {
  const data = product.get({ plain: true });

  return {
    ...data,
    category: data.category?.name ?? '',
    sizes: data.sizes?.map(size => size.name) ?? [],
    price: Number(data.price)
  };
}

async function getProducts() {
  const products = await Product.findAll({
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

  return products.map(formatProduct);
}

function getUserId(req) {
  const id = Number(req.session?.user?.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function requireUser(req, res) {
  if (!getUserId(req)) {
    res.redirect('/login');
    return false;
  }

  return true;
}

async function getActiveCart(userId, transaction) {
  return Cart.findOne({
    where: {
      user_id: userId,
      status: 'active'
    },
    order: [['id', 'DESC']],
    transaction
  });
}

function validId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

const mainController = {

  // Página principal
  home: async (req, res) => {
    try {
      const products = await getProducts();
      res.render('home', { products });
    } catch (error) {
      console.error('Error en inicio:', error);
      res.status(500).send('Error al cargar el inicio');
    }
  },

  // Mostrar carrito
  cart: async (req, res) => {
    if (!requireUser(req, res)) return;

    try {
      const cart = await getActiveCart(getUserId(req));

      let items = [];

      if (cart) {
        const records = await CartItem.findAll({
          where: { cart_id: cart.id },
          include: [
            { model: Product, as: 'product' },
            { model: Size, as: 'size' }
          ],
          order: [['id', 'ASC']]
        });

        items = records.map(record => {
          const data = record.get({ plain: true });

          return {
            id: data.id,
            product: {
              ...data.product,
              price: Number(data.unit_price)
            },
            size: data.size?.name ?? '',
            quantity: data.quantity,
            subtotal: Number(data.unit_price) * data.quantity
          };
        });
      }

      const subtotal = items.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );

      const shipping = 0;

      res.render('carrito', {
        title: 'Carrito | Manglü',
        items,
        subtotal,
        shipping,
        total: subtotal + shipping
      });

    } catch (error) {
      console.error('Error al mostrar carrito:', error);
      res.status(500).send('Error al cargar el carrito');
    }
  },

  // Agregar producto al carrito
  addToCart: async (req, res) => {
    if (!requireUser(req, res)) return;

    const userId = getUserId(req);
    const productId = validId(req.body.productId);
    const quantity = Number(req.body.quantity);
    const sizeName = String(req.body.size ?? '').trim();

    if (
      !productId ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return res.status(400).send('Producto o cantidad inválida');
    }

    try {
      await sequelize.transaction(async transaction => {
        const product = await Product.findByPk(productId, {
          transaction
        });

        const size = await Size.findOne({
          where: { name: sizeName },
          transaction
        });

        if (!product || !size) {
          throw new Error('Producto o tamaño no encontrado');
        }

        const available = await ProductSize.findOne({
          where: {
            product_id: product.id,
            size_id: size.id
          },
          transaction
        });

        if (!available) {
          throw new Error('Tamaño no disponible para este producto');
        }

        let cart = await getActiveCart(userId, transaction);

        if (!cart) {
          cart = await Cart.create({
            user_id: userId,
            status: 'active'
          }, { transaction });
        }

        const existing = await CartItem.findOne({
          where: {
            cart_id: cart.id,
            product_id: product.id,
            size_id: size.id
          },
          transaction
        });

        if (existing) {
          await existing.update({
            quantity: existing.quantity + quantity
          }, { transaction });
        } else {
          await CartItem.create({
            cart_id: cart.id,
            product_id: product.id,
            size_id: size.id,
            quantity,
            unit_price: product.price
          }, { transaction });
        }
      });

      res.redirect('/carrito');

    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(400).send(
        'No se pudo agregar el producto. Verifica el tamaño seleccionado.'
      );
    }
  },

  // Actualizar cantidad
  updateCartItem: async (req, res) => {
    if (!requireUser(req, res)) return;

    const itemId = validId(req.params.id);
    const quantity = Number(req.body.quantity);

    if (!itemId || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return res.status(400).send('Cantidad inválida');
    }

    try {
      const cart = await getActiveCart(getUserId(req));

      if (!cart) {
        return res.status(404).send('Carrito no encontrado');
      }

      const item = await CartItem.findOne({
        where: { id: itemId, cart_id: cart.id }
      });

      if (!item) {
        return res.status(404).send('Artículo no encontrado');
      }

      await item.update({ quantity });

      res.redirect('/carrito');

    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      res.status(500).send('Error al actualizar el carrito');
    }
  },

  // Eliminar artículo
  removeCartItem: async (req, res) => {
    if (!requireUser(req, res)) return;

    try {
      const cart = await getActiveCart(getUserId(req));

      if (!cart) {
        return res.status(404).send('Carrito no encontrado');
      }

      const deleted = await CartItem.destroy({
        where: {
          id: req.params.id,
          cart_id: cart.id
        }
      });

      if (!deleted) {
        return res.status(404).send('Artículo no encontrado');
      }

      res.redirect('/carrito');

    } catch (error) {
      console.error('Error al eliminar artículo:', error);
      res.status(500).send('Error al eliminar el artículo');
    }
  }
};

module.exports = mainController;
