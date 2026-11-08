/*
 * Validaciones del front-end (Sprint 7)
 *
 * Cómo funciona: cada <form data-validate> declara las reglas de sus campos con
 * el atributo data-rules, por ejemplo:
 *
 *   <input name="firstName" data-label="El nombre" data-rules="required|min:2">
 *
 * Reglas disponibles:
 *   required        obligatorio (en un checkbox: debe estar marcado)
 *   min:N / max:N   cantidad mínima / máxima de caracteres
 *   email           formato de correo válido
 *   strong          mayúsculas, minúsculas, número y carácter especial
 *   match:id        igual al valor del campo con ese id
 *   gt:N            número mayor que N
 *   image           archivo JPG, JPEG, PNG o GIF de hasta 2 MB
 *   minChecked:N    (en el contenedor de varios checkbox) al menos N marcados
 *
 * Opcionales en el mismo campo:
 *   data-msg-<regla>="..."      cambia el mensaje de una regla (ej. data-msg-required)
 *   data-remote="email-unique"  consulta al servidor que el correo NO exista
 *   data-remote="email-exists"  consulta al servidor que el correo SÍ exista
 *
 * IMPORTANTE: esto mejora la experiencia, pero el usuario puede desactivarlo.
 * La validación que protege de verdad es la del back-end (express-validator).
 */
(function () {
  'use strict';

  var MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
  var IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var STRONG_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/;
  var FORM_ALERT = 'Revisa los campos marcados en rojo antes de continuar.';

  // ---------- Reglas: devuelven un mensaje si falla, o '' si pasa ----------

  var rules = {
    required: function (field, arg, label) {
      var empty;
      if (field.type === 'checkbox') empty = !field.checked;
      else if (field.type === 'file') empty = field.files.length === 0;
      else empty = field.value.trim() === '';
      // "La contraseña es obligatoria." / "El nombre es obligatorio."
      var ending = /^(La|Las)\s/.test(label) ? 'obligatoria' : 'obligatorio';
      return empty ? label + ' es ' + ending + '.' : '';
    },

    min: function (field, arg, label) {
      return field.value.trim().length < Number(arg)
        ? label + ' debe tener al menos ' + arg + ' caracteres.'
        : '';
    },

    max: function (field, arg, label) {
      return field.value.trim().length > Number(arg)
        ? label + ' no puede superar los ' + arg + ' caracteres.'
        : '';
    },

    email: function (field) {
      return EMAIL_REGEX.test(field.value.trim())
        ? ''
        : 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
    },

    strong: function (field) {
      return STRONG_REGEX.test(field.value)
        ? ''
        : 'La contraseña debe tener mayúsculas, minúsculas, un número y un carácter especial.';
    },

    match: function (field, arg) {
      var other = document.getElementById(arg);
      return other && field.value !== other.value ? 'Las contraseñas no coinciden.' : '';
    },

    gt: function (field, arg) {
      var value = Number(field.value);
      return !isFinite(value) || value <= Number(arg)
        ? 'Ingresa un precio válido, mayor que ' + arg + '.'
        : '';
    },

    image: function (field) {
      var file = field.files[0];
      if (!file) return '';

      var extension = file.name.split('.').pop().toLowerCase();
      if (IMAGE_EXTENSIONS.indexOf(extension) === -1) {
        return 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.';
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return 'La imagen no puede pesar más de 2 MB.';
      }
      return '';
    },

    // Se aplica al contenedor de un grupo de checkbox
    minChecked: function (field, arg) {
      var checked = field.querySelectorAll('input[type="checkbox"]:checked').length;
      return checked < Number(arg) ? 'Elige al menos una opción.' : '';
    }
  };

  // ---------- Utilidades ----------

  function parseRules(field) {
    return (field.getAttribute('data-rules') || '')
      .split('|')
      .filter(Boolean)
      .map(function (item) {
        var parts = item.split(':');
        return { name: parts[0], arg: parts[1] };
      });
  }

  function isEmpty(field) {
    if (field.type === 'checkbox') return !field.checked;
    if (field.type === 'file') return field.files.length === 0;
    if (field.hasAttribute('data-rules') && field.tagName === 'DIV') return false;
    return field.value.trim() === '';
  }

  function messageOverride(field, ruleName) {
    // data-msg-required, data-msg-min, ...
    return field.getAttribute('data-msg-' + ruleName.toLowerCase());
  }

  // Devuelve el primer mensaje de error del campo (o '' si es válido)
  function validateField(field) {
    var label = field.getAttribute('data-label') || 'Este campo';
    var list = parseRules(field);
    var isRequired = list.some(function (r) { return r.name === 'required'; });

    // Un campo opcional vacío no se valida (ej. la foto de perfil)
    if (!isRequired && isEmpty(field) && field.tagName !== 'DIV') return '';

    for (var i = 0; i < list.length; i++) {
      var rule = list[i];
      var check = rules[rule.name];
      if (!check) continue;

      var message = check(field, rule.arg, label);
      if (message) return messageOverride(field, rule.name) || message;
    }

    // Resultado de la consulta al servidor (correo repetido / inexistente)
    if (field._remoteMessage && field._remoteValue === field.value.trim()) {
      return field._remoteMessage;
    }

    return '';
  }

  // ---------- Mostrar y quitar errores ----------

  function errorBox(field) {
    var group = field.closest('.form-group');
    if (!group) return null;

    var box = group.querySelector('.form-error');
    if (!box) {
      box = document.createElement('p');
      box.className = 'form-error';
      box.setAttribute('data-js-error', '');
      group.appendChild(box);
    }
    return box;
  }

  function showError(field, message) {
    var group = field.closest('.form-group');
    var box = errorBox(field);

    if (message) {
      group && group.classList.add('has-error');
      field.setAttribute('aria-invalid', 'true');
      if (box) { box.textContent = message; box.hidden = false; }
    } else {
      group && group.classList.remove('has-error');
      field.setAttribute('aria-invalid', 'false');
      if (box) {
        // El mensaje que escribió el servidor también se limpia al corregir
        box.textContent = '';
        box.hidden = true;
      }
    }
  }

  function showFormAlert(form, visible) {
    var alert = form.querySelector('[data-js-alert]');

    // Si el servidor ya mostró este mismo aviso, no se repite
    var serverAlert = form.parentNode.querySelector('.form-alert:not([data-js-alert])');
    if (serverAlert && serverAlert.textContent.trim() === FORM_ALERT) return;

    if (visible && !alert) {
      alert = document.createElement('div');
      alert.className = 'form-alert';
      alert.setAttribute('role', 'alert');
      alert.setAttribute('data-js-alert', '');
      alert.textContent = FORM_ALERT;
      form.insertBefore(alert, form.firstChild);
    }

    if (alert) alert.hidden = !visible;
  }

  // ---------- Consulta al servidor (correo único / existente) ----------

  var pendingRequest = 0;

  function checkRemote(field, form) {
    var mode = field.getAttribute('data-remote');
    if (!mode) return;

    var value = field.value.trim();
    if (!value || validateField(field)) return;
    if (field._remoteValue === value) return; // ya consultado

    var requestId = ++pendingRequest;

    fetch('/api/email-exists?email=' + encodeURIComponent(value), {
      headers: { Accept: 'application/json' }
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        // Si el usuario siguió escribiendo, se ignora la respuesta vieja
        if (requestId !== pendingRequest || field.value.trim() !== value) return;

        field._remoteValue = value;
        if (mode === 'email-unique' && data.exists) {
          field._remoteMessage = 'Ya existe una cuenta con ese correo.';
        } else if (mode === 'email-exists' && !data.exists) {
          field._remoteMessage = 'No existe una cuenta con ese correo.';
        } else {
          field._remoteMessage = '';
        }
        showError(field, validateField(field));
      })
      .catch(function () {
        // Sin conexión o error del servidor: no se bloquea al usuario,
        // el back-end lo validará de todas formas.
      });
  }

  // ---------- Inicialización de cada formulario ----------

  function setup(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('[data-rules]'));
    var touched = new WeakSet();

    function run(field) {
      var message = validateField(field);
      showError(field, message);
      return message;
    }

    function fieldFor(target) {
      // Un checkbox dentro de un grupo valida el grupo completo
      var group = target.closest && target.closest('[data-rules]');
      return group && fields.indexOf(group) !== -1 ? group : null;
    }

    // Al salir de un campo se valida por primera vez
    form.addEventListener('focusout', function (event) {
      var field = fieldFor(event.target);
      if (!field) return;
      touched.add(field);
      run(field);
      checkRemote(field, form);
    });

    // Después, cada cambio se revisa en vivo para que el error desaparezca al corregirlo
    function onChange(event) {
      var field = fieldFor(event.target);
      if (!field) return;

      if (field.getAttribute('data-remote')) {
        field._remoteMessage = '';
        field._remoteValue = '';
      }

      // Si el servidor ya marcó este campo con un error, se revisa en vivo para que desaparezca al corregirlo
      var group = field.closest('.form-group');
      if (group && group.classList.contains('has-error')) touched.add(field);

      // Archivos y grupos de checkbox se validan al instante
      var instant = field.type === 'file' || field.tagName === 'DIV' || field.type === 'checkbox' || field.tagName === 'SELECT';
      if (instant) touched.add(field);

      if (touched.has(field)) run(field);

      // Si cambia la contraseña, se revisa otra vez su confirmación
      if (field.id) {
        fields.forEach(function (other) {
          if (touched.has(other) && other.getAttribute('data-rules').indexOf('match:' + field.id) !== -1) {
            run(other);
          }
        });
      }
    }
    form.addEventListener('input', onChange);
    form.addEventListener('change', onChange);

    // Al enviar se valida todo; si algo falla, no se envía
    form.addEventListener('submit', function (event) {
      var firstInvalid = null;

      fields.forEach(function (field) {
        touched.add(field);
        if (run(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        event.preventDefault();
        showFormAlert(form, true);

        var focusable = firstInvalid.tagName === 'DIV'
          ? firstInvalid.querySelector('input')
          : firstInvalid;
        if (focusable) focusable.focus();
      } else {
        showFormAlert(form, false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-validate]'), setup);
  });
})();
