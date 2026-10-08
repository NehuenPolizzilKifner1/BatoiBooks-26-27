# Auditoría

## 1. removeBook(bookId)

- La función original es:

```js
removeBook(bookId) {
    this.data = this.data.filter(b => b.id !== bookId)
}
```
Lo que hace filter() es crear un array nuevo y sustituir this.data por ese nuevo array. No es necesario crear otro array para eliminar un elemento concreto.

Además, la función no comprueba si existe un libro con el bookId indicado. Si se pasa un ID que no existe, simplemente devuelve el array sin hacer ningún cambio y no informa de que el libro no existía.

Una versión mejor es utilizar findIndex() para localizar el libro y splice() para eliminarlo:

```js
removeBook(removeId) {
    const index = this.data.findIndex(book => book.id === removeId)

    if (index === -1) {
        throw new Error()
    }

    this.data.splice(index, 1)
}
```

## 2. addBook(bookData)

- La función original es:

```js
addBook(bookData) {
    const newBook = new Book({ ...bookData, id: this.data.length + 1 })
    this.data.push(newBook)
    return newBook
}
```

El problema está en utilizar this.data.length + 1 para generar el ID.

El número de elementos del array no indica necesariamente cuál debe ser el siguiente ID. Por ejemplo, si tenemos libros con los IDs 1, 2 y 3 y eliminamos el libro con ID 2, el array tendrá dos elementos. Si añadimos otro libro, this.data.length + 1 generaría el ID 3, que ya existe.

Por tanto, podemos generar el nuevo ID buscando el ID más grande que existe y sumándole 1:

```js
addBook(payload) {
    const newId = Math.max(...this.data.map(book => book.id)) + 1
    const newBook = new Book({ ...payload, id: newId })

    this.data.push(newBook)

    return newBook
}
```

Esta versión es mejor porque el nuevo ID se obtiene a partir del mayor ID existente y se evita generar un ID que ya esté utilizado.
Además, se crea el libro mediante new Book(), por lo que el nuevo elemento es una instancia de la clase Book.

## 3. changeBook(newData)

- La función original es:

```js
changeBook(newData) {
    const index = this.data.findIndex(b => b.id === newData.id)

    this.data[index] = newData

    return newData
}
```

El problema es que newData es un objeto normal y no una instancia de la clase Book.

Al sustituir directamente el elemento del array por newData, perdemos el comportamiento que proporciona la clase Book, como sus métodos.

Por tanto, debemos crear una nueva instancia de Book antes de sustituir el elemento:

```js
changeBook(newData) {
    const index = this.data.findIndex(book => book.id === newData.id)

    if (index === -1) {
        throw new Error()
    }

    const newBook = new Book(newData)

    this.data[index] = newBook

    return newBook
}
```

Esta versión comprueba primero que existe un libro con el ID indicado. Si no existe, lanza un error.

Después crea una instancia de Book con los nuevos datos y sustituye el libro antiguo por esta nueva instancia.

De esta manera, los elementos de this.data siguen siendo objetos de la clase Book.