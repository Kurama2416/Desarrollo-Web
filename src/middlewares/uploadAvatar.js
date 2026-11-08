const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Carpeta donde se guardan las fotos de perfil
const destination = path.join(__dirname, '..', '..', 'public', 'images', 'users');
fs.mkdirSync(destination, { recursive: true });

const allowedExtensions = ['.jpg', '.jpeg', '.png'];
const allowedTypes = ['image/jpeg', 'image/png'];
const maxSize = 2 * 1024 * 1024; // 2 MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, destination),
  // Nombre único: user-1699123456789.png
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `user-${Date.now()}${ext}`);
  }
});

// Solo se aceptan imágenes JPG, JPEG o PNG
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext) && allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  req.fileError = 'La imagen debe ser un archivo JPG, JPEG o PNG.';
  cb(null, false); // se omite el archivo; el controlador mostrará el error en el formulario
};

const upload = multer({ storage, fileFilter, limits: { fileSize: maxSize } });

// Middleware de ruta: procesa el campo "avatar" y, si algo falla, deja el mensaje en req.fileError
module.exports = (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      req.fileError = err.code === 'LIMIT_FILE_SIZE'
        ? 'La imagen no puede pesar más de 2 MB.'
        : 'No se pudo subir la imagen. Inténtalo de nuevo.';
    }
    next();
  });
};