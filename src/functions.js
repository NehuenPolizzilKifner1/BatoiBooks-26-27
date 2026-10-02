'use strict'

function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId)

    if (!book) {
        throw new Error()
    } else {
        return book
    }

}

function getBookIndexById(books, bookId) {
    const bookByID = books.findIndex(bookByID => bookByID.id === bookId)

    if (bookByID === -1) {
        throw new Error()
    } else {
        return bookByID
    }
}

function getUserById(users, userId) {
    const user = users.find(user => user.id === userId)

    if (!user) {
        throw new Error()
    } else {
        return user
    }
}

function getUserIndexById(users, userId) {
    const userByID = users.findIndex(userByID => userByID.id === userId)

    if (userByID === -1) {
        throw new Error()
    } else {
        return userByID
    }
}

function getUserByNickName(users, userNick) {
    const user = users.find(user => user.nick === userNick)

    if (!user) {
        throw new Error()
    } else {
        return user
    }
}

function getModuleByCode(modules, moduleCode) {
    const module = modules.find(module => module.code === moduleCode)

    if (!module) {
        throw new Error()
    } else {
        return module
    }
}
function booksFromUser(books, userId) {
    const libros = books.filter(libros => libros.userId === userId)

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }

}

function booksFromModule(books, moduleCode) {
    const libros = books.filter(libros => libros.moduleCode === moduleCode)

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

function booksCheeperThan(books, price) {
    const libros = books.filter(libros => libros.price < price)

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

function booksWithStatus(books, status) {
    const libros = books.filter(libros => libros.status === status)

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

function averagePriceOfBooks(books) {
    const total = books.reduce((sum, book) => sum + book.price, 0)
    const average = (total / books.length).toFixed(2) + ' €'

    if (!average) {
        throw new Error()
    } else {
        return average
    }
}

function booksOfTypeNotes(books) {
    const libros = books.filter(libros => libros.publisher === "Apunts")

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

function bookExists(books, userId, moduleCode) {
    const libro = books.find(libro => libro.userId === userId && libro.moduleCode === moduleCode)

    if (!libro) {
        return false
    } else {
        return true
    }
}

function booksNotSold(books) {
    const libros = books.filter(book => book.soldDate === "")

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

function incrementPriceOfBooks(books, percentage) {
    const libros = books.map(book => ({...book, price: book.price * (1 + percentage / 100)}))

    if (!libros) {
        throw new Error()
    } else {
        return libros
    }
}

export {
    getBookById,
    getBookIndexById,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    bookExists,
    booksNotSold,
    incrementPriceOfBooks
}