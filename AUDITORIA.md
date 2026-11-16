# Auditoría de BatoiBooks

He revisado el método `renderBook()` propuesto en el dossier y lo he comparado con mi implementación de `View`.

## 1. No contempla que el módulo del libro no exista

**Qué falla**

El código de ejemplo utiliza directamente `module.cliteral`. Si `module` es `undefined` porque no se ha encontrado el módulo correspondiente, se produce un error al intentar acceder a `cliteral`.

**Cómo reproducirlo**

Cargar un libro cuyo `moduleCode` no coincida con el código de ninguno de los módulos recibidos del servidor.

**Consecuencias**

La tarjeta de ese libro no se puede mostrar. Además, el error puede interrumpir la carga del resto de libros.

**Cómo lo he corregido**

En mi método busco el módulo dentro del array recibido y compruebo si existe antes de acceder a su nombre:

```js
const module = modules.find(module => module.code === book.moduleCode)
const moduleName = module ? module.cliteral : book.moduleCode
```

Si no existe, muestro el código del módulo, tal como pide el enunciado. Así se conserva la tarjeta y no se interrumpe la aplicación.

## 2. La condición de `soldDate` está invertida

**Qué falla**

El ejemplo muestra `En venta` cuando `soldDate` tiene contenido y muestra `Vendido el ...` cuando está vacío. Es justo al revés: una fecha indica que el libro se ha vendido; una cadena vacía indica que sigue en venta.

**Cómo reproducirlo**

Mostrar un libro con `soldDate: ''` y otro con `soldDate: '2023-12-21'`.

**Consecuencias**

La información del estado de venta aparece intercambiada y puede confundir al usuario.

**Cómo lo he corregido**

En mi código utilizo la condición correcta:

```js
book.soldDate
    ? 'Vendido el ' + new Date(book.soldDate).toLocaleDateString('es-ES')
    : 'En venta'
```

Cuando hay fecha, muestro que está vendido; cuando no hay fecha, muestro que está en venta.

## 3. La fecha de venta no se muestra en un formato legible

**Qué falla**

El ejemplo concatena directamente `book.soldDate`, por lo que puede mostrar el formato original recibido del servidor, por ejemplo `2023-12-21`, en lugar del formato habitual `21/12/2023`.

**Cómo reproducirlo**

Cargar un libro vendido con `soldDate: '2023-12-21'`.

**Consecuencias**

No rompe la aplicación, pero la fecha no se presenta con el formato solicitado en el ejemplo del enunciado y resulta menos cómoda de leer.

**Cómo lo he corregido**

Convierto el valor a un objeto `Date` y utilizo `toLocaleDateString('es-ES')` para mostrar día, mes y año en el formato local.

## 4. Uso de `innerHTML` con datos recibidos del servidor (riesgo XSS)

**Qué falla**

El ejemplo construye toda la tarjeta mediante una plantilla asignada a `innerHTML`, interpolando directamente propiedades del libro y del módulo. Mi primera implementación también utilizaba este mecanismo. Si alguno de esos valores contiene etiquetas HTML o atributos con código JavaScript, el navegador puede interpretarlos como parte de la página en vez de mostrarlos como texto.

**Cómo reproducirlo**

Cargar un libro cuya editorial sea, por ejemplo:

```html
<img src=x onerror=alert(1)>
```

En una implementación vulnerable, el navegador crea un elemento `img` dentro de la tarjeta en lugar de mostrar literalmente ese texto.

**Consecuencias**

No es solamente un problema visual. Si se consigue introducir contenido malicioso en los datos, puede ejecutarse código en el navegador de quien visite la aplicación. Esto es un riesgo de seguridad conocido como Cross-Site Scripting (XSS).

**Cómo lo he corregido**

He sustituido la interpolación de datos en `innerHTML` por la creación de elementos con `document.createElement()` y la asignación de los datos mediante `textContent`. De esta forma, los valores del libro se muestran como texto y no se interpretan como etiquetas HTML. Para la imagen asigno la dirección mediante la propiedad `src`.

He elegido esta solución porque permite conservar la estructura visual de la tarjeta y evita interpretar los datos del servidor como código HTML.