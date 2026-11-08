// Único lugar que lee y escribe users.json.
// Si más adelante los usuarios pasan a una base de datos, solo hay que cambiar este archivo.
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'database', 'users.json');
const DEFAULT_IMAGE = '/images/users/default.svg';

// ===== Acceso al archivo JSON (siempre actualizado, sin caché) =====
function readUsers() {
  const raw = fs.readFileSync(dbPath, 'utf-8').trim();
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2) + '\n');
}

const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase();

const userModel = {
  findById(id) {
    return readUsers().find((u) => u.id === Number(id)) || null;
  },

  findByEmail(email) {
    const wanted = normalizeEmail(email);
    return readUsers().find((u) => normalizeEmail(u.email) === wanted) || null;
  },

  // Crea un usuario nuevo: cifra la contraseña y le asigna la categoría "customer"
  create({ firstName, lastName, email, password, image }) {
    const users = readUsers();
    const user = {
      id: users.reduce((max, u) => Math.max(max, u.id), 0) + 1,
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: normalizeEmail(email),
      password: bcrypt.hashSync(password, 10),
      category: 'customer', // nadie puede registrarse como administrador desde el formulario
      image: image || DEFAULT_IMAGE
    };
    users.push(user);
    saveUsers(users);
    return user;
  },

  // Devuelve el usuario si el correo y la contraseña son correctos; si no, null
  authenticate(email, password) {
    const user = this.findByEmail(email);
    if (!user) return null;
    return bcrypt.compareSync(String(password ?? ''), user.password) ? user : null;
  },

  // Datos que se guardan en la sesión: nunca incluyen la contraseña
  toSession(user) {
    const { id, firstName, lastName, email, category, image } = user;
    return { id, firstName, lastName, email, category, image };
  }
};

module.exports = userModel;