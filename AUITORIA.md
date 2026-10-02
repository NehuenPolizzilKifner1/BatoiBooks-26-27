# Explicación de porque la función es errónea

```
function booksNotSold(books) {
  let result = []
  for (let book of books) {
    if (book.soldDate == null) {
      result.push(book)
    }
  }
 return result
}
```

- La función original es incorrecta porque comprueba si **book.soldDate == null**, pero en nuestros datos los libros que todavía no se han vendido tienen el atributo soldDate con una cadena vacía (""), no con null.

- Además, es recomendable utilizar el operador de comparación estricta (===) para evitar conversiones de tipos inesperadas.

## Función corregida

```
function booksNotSold(books) {
    let result = []

    for (let book of books) {
        if (book.soldDate === "") {
            result.push(book)
        }
    }

    return result
}
```

# Variante de la función incrementPriceOfBooks

```
function incrementPriceOfBooks(books, percentage) {
    for (let book of books) {
        book.price = book.price * (1 + percentage / 100)
    }

    return books
}
```

## ¿Por qué la primera versión es fuerte?

- Porque la primera versión utliza map(), que crea un nuevo array y deja intacto el original.
- Es mucho más fácil de entender.
- Reduce errores al no modificar el array original y no afectará a otras partes del programa.