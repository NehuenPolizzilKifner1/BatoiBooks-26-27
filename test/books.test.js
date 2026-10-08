import { describe, test, expect } from 'vitest'
import Books from '../src/model/books.class'
import Book from '../src/model/book.class'

const booksFixture = [
    {
        id: 31,
        userId: 2,
        moduleCode: '2150',
        publisher: "Apunts",
        price: 14,
        pages: 76,
        status: "bad",
        soldDate: "2023-03-25",
        photo: "book31img1.png",
        comments: "Muy buen estado"
    },
    {
        id: 35,
        userId: 2,
        moduleCode: '7021',
        publisher: "McGraw-Hill",
        price: 34,
        pages: 116,
        status: "good"
    }
]

describe('Clase Books', () => {

    test('constructor crea una colección vacía', () => {
        const newBooks = new Books()

        expect(newBooks).toBeInstanceOf(Books)
        expect(newBooks.data).toEqual([])
    })

    test('populate crea los libros y los guarda en data', () => {
        const newBooks = new Books()

        newBooks.populate(booksFixture)

        expect(newBooks.data).toHaveLength(2)
        expect(newBooks.data[0]).toBeInstanceOf(Book)
        expect(newBooks.data[1]).toBeInstanceOf(Book)
    })

    test('addBook añade un libro', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const datosNuevoLibro = {
            userId: 3,
            moduleCode: '0012',
            publisher: 'Anaya',
            price: 25,
            pages: 100,
            status: 'new'
        }

        const newBook = newBooks.addBook(datosNuevoLibro)

        expect(newBook).toBeInstanceOf(Book)
        expect(newBooks.data).toHaveLength(3)
        expect(newBook.id).toBe(36)
    })

    test('addBook no permite repetir un id', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const datosNuevoLibro = {
            id: 31,
            userId: 3,
            moduleCode: '0012',
            publisher: 'Anaya',
            price: 25,
            pages: 100,
            status: 'new'
        }

        const newBook = newBooks.addBook(datosNuevoLibro)

        expect(newBooks.data).toHaveLength(3)
        expect(newBook.id).toBe(36)
    })

    test('getBookById devuelve el libro con id 31', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.getBookById(31)

        expect(response.id).toBe(31)
    })

    test('getBookById devuelve un error si el libro no existe', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        expect(() => newBooks.getBookById(22)).toThrow()
    })

    test('getBookIndexById devuelve el índice del libro', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.getBookIndexById(31)

        expect(response).toBe(0)
    })

    test('getBookIndexById devuelve un error si el libro no existe', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        expect(() => newBooks.getBookIndexById(122)).toThrow()
    })

    test('booksFromUser devuelve los libros del usuario 2', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksFromUser(2)
        const userBooks = newBooks.data.filter(book => book.userId === 2)

        expect(response).toEqual(userBooks)
    })

    test('booksFromUser devuelve un array vacío si no hay libros', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksFromUser(999)

        expect(response).toEqual([])
    })

    test('booksFromModule devuelve los libros del módulo 2150', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksFromModule('2150')
        const moduleBooks = newBooks.data.filter(book => book.moduleCode === '2150')

        expect(response).toEqual(moduleBooks)
    })

    test('booksFromModule devuelve un array vacío si no hay libros', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksFromModule('9999')

        expect(response).toEqual([])
    })

    test('booksCheeperThan devuelve los libros de 16 euros o menos', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksCheeperThan(16)
        const cheapBooks = newBooks.data.filter(book => book.price <= 16)

        expect(response).toEqual(cheapBooks)
    })

    test('booksCheeperThan devuelve un array vacío si no hay libros', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksCheeperThan(0)

        expect(response).toEqual([])
    })

    test('booksWithStatus devuelve los libros con estado bad', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksWithStatus('bad')
        const badStatusBooks = newBooks.data.filter(book => book.status === 'bad')

        expect(response).toEqual(badStatusBooks)
    })

    test('booksWithStatus devuelve un array vacío si no existe el estado', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksWithStatus('hola')

        expect(response).toEqual([])
    })

    test('averagePriceOfBooks devuelve la media de precio', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.averagePriceOfBooks()

        expect(response).toBe('24.00 €')
    })

    test('booksOfTypeNotes devuelve los libros de tipo Apunts', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksOfTypeNotes()
        const apunts = newBooks.data.filter(book => book.publisher === 'Apunts')

        expect(response).toEqual(apunts)
    })

    test('bookExists devuelve true si existe el libro', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.bookExists(2, '2150')

        expect(response).toBe(true)
    })

    test('bookExists devuelve false si no existe el libro', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.bookExists(7, '9999')

        expect(response).toBe(false)
    })

    test('booksNotSold devuelve los libros no vendidos', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.booksNotSold()
        const notSoldBooks = newBooks.data.filter(book => book.soldDate === '')

        expect(response).toEqual(notSoldBooks)
    })

    test('incrementPriceOfBooks aumenta un 10% el precio', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const response = newBooks.incrementPriceOfBooks()

        expect(response[0].price).toBeCloseTo(15.4, 2)
        expect(response[1].price).toBeCloseTo(37.4, 2)
    })

    test('incrementPriceOfBooks no modifica el array original', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        newBooks.incrementPriceOfBooks(0.10)

        expect(newBooks.data[0].price).toBe(14)
        expect(newBooks.data[1].price).toBe(34)
    })

    test('removeBook elimina un libro', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        newBooks.removeBook(31)

        expect(newBooks.data).toHaveLength(1)
        expect(newBooks.data[0].id).toBe(35)
    })

    test('removeBook lanza un error si el libro no existe y mantiene la cantidad', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const cantidadAntes = newBooks.data.length

        expect(() => newBooks.removeBook(999)).toThrow()
        expect(newBooks.data).toHaveLength(cantidadAntes)
    })

    test('changeBook modifica un libro existente', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const newData = {
            id: 31,
            userId: 2,
            moduleCode: '2150',
            publisher: 'Anaya',
            price: 20,
            pages: 80,
            status: 'good'
        }

        const response = newBooks.changeBook(newData)

        expect(response).toBeInstanceOf(Book)
        expect(response.id).toBe(31)
        expect(response.publisher).toBe('Anaya')
        expect(response.price).toBe(20)
        expect(newBooks.data[0].price).toBe(20)
    })

    test('changeBook lanza un error si el libro no existe', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        expect(() => newBooks.changeBook({
            id: 999,
            userId: 2,
            moduleCode: '2150',
            publisher: 'Anaya',
            price: 20,
            pages: 80,
            status: 'good'
        })).toThrow()
    })

    test('toString devuelve los libros como texto', () => {
        const newBooks = new Books()
        newBooks.populate(booksFixture)

        const texto = newBooks.toString()

        expect(texto).toContain('31')
        expect(texto).toContain('Apunts')
        expect(texto).toContain('bad')
        expect(texto).toContain('35')
        expect(texto).toContain('McGraw-Hill')
        expect(texto).toContain('good')
    })
})