# Retrospectiva Sprint 4 – Manglü

## Retrospectiva Starfish

### ➕ Comenzar a hacer

* Revisar cada archivo contra la consigna y contra la estructura del ejemplo antes de darlo por terminado.
* Ejecutar `npm install` y `npm start` apenas se crea el `package.json` o se instala un paquete, para detectar errores a tiempo.
* Mantener el tablero y los documentos (`retro.md` y `README.md`) al día durante el sprint y no dejarlos para el final.

### 🔄 Hacer más

* Seguir la estructura de carpetas del ejemplo del profesor y mantener los nombres consistentes entre archivos.
* Probar el CRUD completo en el navegador: crear, editar, eliminar y reiniciar el servidor para comprobar que los datos se conservan.
* Usar middlewares para no repetir código, como el que deja los datos del sitio disponibles en todas las vistas.

### ⭐ Continuar haciendo

* Guardar los datos en archivos JSON y leerlos en cada petición, para que los cambios se vean al instante.
* Validar en el servidor y mostrar los errores en el formulario, conservando lo que la persona escribió.
* Trabajar en pasos pequeños y ordenados, un archivo a la vez.
* Mantener rutas unificadas en `/products`, con las siete rutas pedidas.

### 🔽 Hacer menos

* Pegar código en un archivo sin comprobar en qué parte va: en `index.js` quedaron dos middlewares después de `app.listen`, y por eso ninguna página cargaba.
* Dejar `README.md` y `retro.md` vacíos hasta el último momento.

### 🛑 Dejar de hacer

* Instalar paquetes sueltos antes de tener el `package.json` completo: el `package-lock.json` quedó con un solo paquete y faltaban Express y EJS.
* Escribir mal nombres sin releerlos: el `.gitignore` decía `node_module/` y no ignoraba `node_modules/`.
* Entregar el proyecto con la carpeta `node_modules/` incluida.

## Conclusión

En el sprint 4 se implementó el CRUD completo de productos con datos en archivos JSON, siguiendo la estructura de carpetas del ejemplo del profesor, con las siete rutas pedidas, eliminación con confirmación y validación en el servidor. Los problemas principales fueron de orden y de cuidado con los detalles (el orden de los middlewares, un nombre mal escrito y las dependencias sin instalar), no de lógica. Para el sprint 5 nos llevamos la costumbre de probar después de cada cambio, revisar los archivos al pegarlos y actualizar los documentos durante el sprint.