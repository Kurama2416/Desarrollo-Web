# Retrospectiva Sprint 3 – Manglü

## Retrospectiva Starfish

### ⭐ Continuar haciendo

* Separar el código en modelo, controlador, rutas y vistas, y construir cada parte en pasos pequeños.
* Reutilizar un solo formulario para crear y editar productos, en lugar de duplicarlo.
* Validar los datos en el servidor y mostrar los errores en el formulario, conservando lo que la persona había escrito.
* Mantener el diseño de Manglü con las variables de CSS, para que las páginas nuevas se vean igual que las anteriores.

### 🛑 Dejar de hacer

* Guardar los productos solo en memoria: los que se creaban o editaban se perdían al reiniciar el servidor.
* Repetir las mismas funciones auxiliares en varios controladores (por ejemplo, el formato del precio).
* Mezclar nombres en español e inglés para el mismo recurso: el listado estaba en `/productos` y el detalle en `/producto/:id`, dos familias de rutas para lo mismo.

### ➕ Comenzar a hacer

* Leer completa la consigna y confirmar rutas, campos y estructura de carpetas antes de escribir código.
* Ejecutar `npm start` después de cada cambio importante, no solo al final.
* Actualizar la documentación (`retro.md`, `README.md` y el tablero) durante el sprint y no dejarla para el último momento.
* Hacer commits más frecuentes, para poder volver atrás si algo se rompe.

### 🔄 Hacer más

* Probar el flujo completo en el navegador (listar, crear y editar) y no solo revisar que el código se vea bien.
* Aprovechar lo que ya está hecho en un sprint para adelantar el siguiente.

### 🔽 Hacer menos

* Acumular todo el CSS en un solo archivo cada vez más largo: ya supera las 1.200 líneas y conviene dividirlo por secciones.
* Dejar decisiones de estructura para el final, cuando cambiarlas obliga a mover muchos archivos.

## Conclusión

En el sprint 3 se agregó la gestión de productos: listado, formulario de carga y formulario de edición, con validación en el servidor y una estructura con modelo, controlador y rutas. La principal limitación fue que los datos vivían en memoria y se perdían al reiniciar. Para el sprint 4 nos llevamos tres tareas claras: guardar los productos en archivos JSON, agregar la eliminación y ordenar el proyecto según la estructura de carpetas pedida, con rutas unificadas en `/products`.