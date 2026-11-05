
const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const DEFAULT_IMAGE = '/images/users/default.svg';

const normalizeEmail = (email) =>
  String(email ?? '').trim().toLowerCase();

function toPlainUser(user) {
  if (!user) return null;

  return typeof user.get === 'function'
    ? user.get({ plain: true })
    : user;
}

const userModel = {

  // Buscar usuario por ID en MySQL
  async findById(id) {
    const user = await User.findByPk(Number(id));
    return toPlainUser(user);
  },

  // Buscar usuario por correo electrónico
  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email: normalizeEmail(email)
      }
    });

    return toPlainUser(user);
  },

  // Registrar un nuevo cliente
  async create({ firstName, lastName, email, password, image }) {
    const hashedPassword = await bcrypt.hash(
      String(password),
      10
    );

    const user = await User.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: normalizeEmail(email),
      password: hashedPassword,
      category: 'customer',
      image: image || DEFAULT_IMAGE
    });

    return toPlainUser(user);
  },

  // Validar credenciales
  async authenticate(email, password) {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const isValid = await bcrypt.compare(
      String(password ?? ''),
      user.password
    );

    return isValid ? user : null;
  },

  // Guardar solamente los datos necesarios en la sesión
  toSession(user) {
    const data = toPlainUser(user);

    if (!data) return null;

    const {
      id,
      firstName,
      lastName,
      email,
      category,
      image
    } = data;

    return {
      id,
      firstName,
      lastName,
      email,
      category,
      image
    };
  }
};

module.exports = userModel;
