# Retrospectiva Sprint 5 – Manglü

## Retrospectiva Starfish ⭐

### ➕ Comenzar a hacer

- Realizar pruebas de registro e inicio de sesión con diferentes datos para identificar posibles errores.
- Revisar los permisos de acceso a las rutas antes de dar por terminada cada funcionalidad.
- Documentar los cambios realizados durante el desarrollo y mantener actualizado el tablero de trabajo.
- Planificar la transición de archivos JSON a una base de datos relacional para mejorar el almacenamiento de la información.

### 🔄 Hacer más

- Probar los formularios de registro e inicio de sesión, incluyendo campos vacíos, correos repetidos y contraseñas incorrectas.
- Verificar el funcionamiento de las sesiones y las redirecciones de usuarios autenticados y no autenticados.
- Revisar las validaciones de imágenes para evitar archivos con formatos o tamaños no permitidos.
- Organizar mejor el código mediante controladores, rutas y middlewares para facilitar su mantenimiento.

### ⭐ Continuar haciendo

- Trabajar de manera organizada, desarrollando y comprobando una funcionalidad a la vez.
- Utilizar bcryptjs para proteger las contraseñas de los usuarios.
- Mantener la separación entre rutas, controladores, modelos y vistas.
- Conservar las funcionalidades de los sprints anteriores mientras se incorporan nuevas características.
- Realizar pruebas en el navegador para verificar que las funcionalidades respondan correctamente.

### 🔽 Hacer menos

- Depender de archivos JSON para almacenar información de usuarios y productos.
- Realizar cambios en varias partes del proyecto sin comprobar primero su funcionamiento.
- Dejar la documentación del README y la retrospectiva para el final.
- Repetir código que puede organizarse mediante middlewares y funciones reutilizables.

### 🛑 Dejar de hacer

- Permitir el acceso a páginas privadas sin verificar que el usuario haya iniciado sesión.
- Guardar contraseñas sin cifrado o incluir información sensible en el repositorio.
- Dar por terminada una funcionalidad sin comprobar los casos en los que el usuario ingresa información incorrecta.
- Depender únicamente de archivos JSON como solución de almacenamiento a largo plazo.

## Dificultades y aprendizajes

Durante el Sprint 5, uno de los principales retos fue implementar el sistema de autenticación de usuarios, incluyendo el registro, inicio de sesión, cierre de sesión y acceso al perfil.

También fue necesario organizar los middlewares para controlar el acceso a las diferentes rutas, diferenciando entre usuarios que habían iniciado sesión y visitantes. Esto permitió comprender mejor la importancia de la seguridad y la organización del código.

Otro aprendizaje importante fue la implementación del cifrado de contraseñas y la subida de fotografías de perfil, ya que estas funcionalidades requieren validaciones para proteger la información de los usuarios.

Finalmente, se identificó que el almacenamiento mediante archivos JSON, aunque fue útil durante los primeros sprints, presentaba limitaciones para continuar ampliando el proyecto. Por esta razón, se planteó como mejora para el Sprint 6 la implementación de una base de datos SQL mediante Sequelize.

## Conclusión

En el Sprint 5 se fortaleció Manglü mediante la implementación del sistema de usuarios, incorporando registro, inicio de sesión, cierre de sesión, perfil y control de acceso mediante middlewares.

Este sprint permitió comprender la importancia de proteger la información de los usuarios, validar los formularios y organizar correctamente las funcionalidades del servidor.

Como principal oportunidad de mejora, se identificó la necesidad de migrar el almacenamiento basado en archivos JSON a una base de datos relacional, con el propósito de facilitar la administración de la información y continuar desarrollando nuevas funcionalidades en el Sprint 6.