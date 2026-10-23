import Book from './book.class.js'
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/api.js'
const pub = "Apunts"
export default class Books {
    constructor() {
        this.data = []
    }

    async fetchAll() {
        const libros = await getDBBooks()
        this.data = libros.map(book => new Book(book))
    }

    async addBook(payload) {
        const libro = await addDBBook(payload)
        const newBook = new Book(libro)

        this.data.push(newBook)

        return newBook
    }

    async removeBook(removeId) {
        await removeDBBook(removeId)
        const index = this.data.findIndex(book => book.id === removeId)

        if (index === -1) {
            throw new Error()
        }

        this.data.splice(index, 1)
    }

    async changeBook(newData) {
        const libroEditado = await changeDBBook(newData)
        const index = this.data.findIndex(book => book.id === newData.id)

        if (index === -1) {
            throw new Error()
        }

        const newBook = new Book(libroEditado)

        this.data[index] = newBook

        return newBook
    }

    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId)

        if (!book) {
            throw new Error()
        }
        return book


    }

    getBookIndexById(bookId) {
        const bookByID = this.data.findIndex(bookByID => bookByID.id === bookId)

        if (bookByID === -1) {
            throw new Error()
        }
        return bookByID

    }

    booksFromUser(userId) {
        return this.data.filter(libros => libros.userId === userId)
    }

    booksFromModule(moduleCode) {
        return this.data.filter(libros => libros.moduleCode === moduleCode)
    }

    booksCheeperThan(price) {
        return this.data.filter(libros => libros.price < price)

    }

    booksWithStatus(status) {
        return this.data.filter(libros => libros.status === status)
    }

    averagePriceOfBooks() {
        const total = this.data.reduce((sum, book) => sum + book.price, 0)
        const average = (total / this.data.length).toFixed(2) + ' €'

        if (!average) {
            throw new Error()
        } else {
            return average
        }
    }

    booksOfTypeNotes() {
        return this.data.filter(libros => libros.publisher === pub)
    }

    bookExists(userId, moduleCode) {
        const libro = this.data.find(libro => libro.userId === userId && libro.moduleCode === moduleCode)

        if (!libro) {
            return false
        }
        return true

    }

    booksNotSold() {
        return this.data.filter(book => book.soldDate === "")
    }

    incrementPriceOfBooks() {
        const libros = this.data.map(book => ({ ...book, price: book.price * (1 + 10 / 100) }))

        if (!libros) {
            throw new Error()
        } else {
            return libros
        }
    }

    toString() {
        return this.data.map(book => book.toString()).join("\n")
    }
}