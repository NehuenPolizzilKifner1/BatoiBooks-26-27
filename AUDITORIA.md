## A. Auditoría: decisiones sobre las consultas de datos

Existen dos opciones para realizar las consultas: trabajar sobre `this.data`, que contiene los datos cargados previamente, o realizar una nueva petición al servidor cada vez.

La primera opción tiene como ventajas que las consultas son más rápidas, no necesita realizar nuevas peticiones HTTP y reduce la carga del servidor. Su inconveniente es que los datos pueden quedar desactualizados si alguien modifica la información del servidor.

La segunda opción permite obtener datos más recientes, pero requiere más peticiones HTTP, puede ser más lenta y depende de que el servidor esté disponible.

En mi implementación he elegido trabajar sobre `this.data` después de ejecutar `fetchAll()`, porque es una solución más sencilla y eficiente para esta práctica.

- **Books:** cargo los libros con `fetchAll()` y métodos como `booksFromUser()` o `booksWithStatus()` consultan el array en memoria.
- **Users:** cargo los usuarios con `fetchAll()` y métodos como `getUserById()` o `getUserByNickName()` buscan los datos en `this.data`.
- **Modules:** cargo los módulos con `fetchAll()` y sus métodos de búsqueda consultan los datos almacenados en memoria.

En conclusión, utilizo esta opción porque permite reutilizar los datos y realizar consultas rápidas. Aunque pueden quedar desactualizados, considero que es suficiente para esta práctica.