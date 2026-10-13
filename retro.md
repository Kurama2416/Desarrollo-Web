# Retrospectiva Sprint 2 – Manglü

## Retrospectiva Starfish

### ⭐ Keep Doing – Seguir haciendo

* Construir el sitio página por página y probarlo en el navegador, en lugar de dejarlo todo para el final.
* Mantener el contenido en un solo archivo de datos (`data/products.js`) y mostrarlo con plantillas EJS, sin escribir los productos a mano en el HTML.
* Reutilizar partials (head, header, footer) y las variables de CSS, para que todas las páginas compartan el mismo diseño.

### 🛑 Stop Doing – Dejar de hacer

* Copiar archivos sin revisar el nombre exacto de las carpetas: una carpeta llamada `controller` en lugar de `controllers` impidió que el servidor arrancara.
* Pegar fragmentos de código sin comprobar en qué parte del archivo van: un bloque de rutas quedó duplicado en `app.js` y causó un error.
* Dejar archivos viejos (`index.html`, `main.js`, `data.js`) mezclados con los nuevos.

### ➕ Start Doing – Empezar a hacer

* Ejecutar `npm start` después de cada cambio importante para detectar errores a tiempo.
* Hacer commits más frecuentes y crear el `.gitignore` desde el inicio, para no subir `node_modules`.
* Mantener el tablero al día durante el sprint y no solo al final.

### 🔄 More Of – Hacer más

* Dividir el trabajo en pasos pequeños y ordenados (modelo, controlador, rutas, vistas).
* Reutilizar componentes ya hechos, como las tarjetas de producto y los estilos de formulario.

### 🔽 Less Of – Hacer menos

* Depender de imágenes externas (Unsplash): conviene tenerlas como recursos locales dentro del proyecto.
* Dejar para el final la revisión de la estructura de carpetas y de los nombres de archivos.

## Conclusión

En el sprint 2 pasamos de una landing estática a una aplicación Node.js + Express con estructura MVC, vistas EJS y partials reutilizables. Quedaron maquetadas las páginas de inicio, detalle de producto, carrito, registro y login, con los enlaces entre ellas. Las mayores dificultades fueron de organización (nombres de carpetas y un archivo mal editado), no de diseño. Para el sprint 3 nos llevamos la costumbre de probar con más frecuencia, revisar la estructura al principio y mantener el tablero actualizado.