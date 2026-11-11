const fs = require('fs');
const { validationResult } = require('express-validator');

// Contraseña fuerte: mayúscula, minúscula, número y carácter especial.
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/;
const STRONG_PASSWORD_MESSAGE =
  'La contraseña debe tener mayúsculas, minúsculas, un número y un carácter especial.';

const IMAGE_ERROR = 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.';

// Convierte el resultado de express-validator en { campo: 'mensaje' }
// (el primer error de cada campo), que es lo que esperan las vistas.
function getErrors(req) {
  const result = validationResult(req);
  if (result.isEmpty()) return {};

  const errors = {};
  for (const [field, error] of Object.entries(result.mapped())) {
    errors[field] = error.msg;
  }
  return errors;
}

// Borra del disco un archivo subido con Multer (cuando el formulario no es válido).
function removeUploadedFile(file) {
  if (file && file.path) {
    try {
      fs.rmSync(file.path, { force: true });
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  }
}

// Mira los primeros bytes del archivo ("firma") para comprobar que de verdad
// es JPG, PNG o GIF. La extensión y el mimetype los envía el navegador y se
// pueden falsificar; la firma no.
function hasValidImageSignature(filePath) {
  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    const head = Buffer.alloc(8);
    fs.readSync(fd, head, 0, 8, 0);

    const isJpg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
    const isPng = head.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const gifHead = head.subarray(0, 6).toString('ascii');
    const isGif = gifHead === 'GIF87a' || gifHead === 'GIF89a';

    return isJpg || isPng || isGif;
  } catch (error) {
    return false;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

// Regla para usar con body('campo').custom(imageRule({ required }))
function imageRule({ required = false, requiredMessage } = {}) {
  return (_value, { req }) => {
    if (req.fileError) {
      throw new Error(req.fileError);
    }

    if (!req.file) {
      if (required) {
        throw new Error(requiredMessage || 'Selecciona una imagen (JPG, JPEG, PNG o GIF).');
      }
      return true;
    }

    if (!hasValidImageSignature(req.file.path)) {
      throw new Error(IMAGE_ERROR);
    }

    return true;
  };
}

module.exports = {
  STRONG_PASSWORD,
  STRONG_PASSWORD_MESSAGE,
  getErrors,
  removeUploadedFile,
  hasValidImageSignature,
  imageRule
};
