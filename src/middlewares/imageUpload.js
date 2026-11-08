const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Formatos permitidos (Sprint 7): JPG, JPEG, PNG y GIF.
const ALLOWED_TYPES = {
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.png': ['image/png'],
  '.gif': ['image/gif']
};

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const FORMAT_ERROR = 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.';

/**
 * Crea el middleware de Multer para subir UNA imagen.
 *
 * Multer no corta la petición cuando el archivo es inválido: deja el mensaje en
 * req.fileError y los validadores (express-validator) lo convierten en un error
 * más del formulario. Así todos los errores se muestran juntos.
 *
 * @param {string} field   nombre del campo <input type="file" name="...">
 * @param {string} folder  carpeta (dentro de public/img) donde se guarda
 * @param {string} prefix  prefijo del nombre del archivo
 */
function createImageUpload({ field, folder, prefix }) {
  const destination = path.join(__dirname, '..', '..', 'public', 'img', folder);
  fs.mkdirSync(destination, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const types = ALLOWED_TYPES[ext];

    if (types && types.includes(file.mimetype)) {
      return cb(null, true);
    }

    req.fileError = FORMAT_ERROR;
    return cb(null, false); // se omite el archivo; el validador mostrará el error
  };

  const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });

  return (req, res, next) => {
    upload.single(field)(req, res, (err) => {
      if (err) {
        req.fileError = err.code === 'LIMIT_FILE_SIZE'
          ? 'La imagen no puede pesar más de 2 MB.'
          : 'No se pudo subir la imagen. Inténtalo de nuevo.';
      }
      next();
    });
  };
}

module.exports = { createImageUpload, ALLOWED_TYPES, MAX_SIZE, FORMAT_ERROR };
