import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Books from '../src/model/books.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Books — persistencia', () => {
    it('fetchAll carga los libros del servidor', async () => {
        const books = new Books()

        await books.fetchAll()

        expect(books.data).toHaveLength(2)
        expect(books.data[0].id).toBe(1)
        expect(books.data[1].publisher).toBe('McGraw-Hill')
    })

    it('addBook crea un libro y lo añade a this.data', async () => {
        const books = new Books()
        const nuevo = {
            userId: 2,
            moduleCode: '5021',
            publisher: 'Apunts',
            price: 12,
            pages: 40,
            status: 'good'
        }

        const response = await books.addBook(nuevo)

        expect(response.id).toBe(999)
        expect(response).toMatchObject(nuevo)
        expect(books.data).toHaveLength(1)
        expect(books.data[0].id).toBe(999)
    })

    it('addBook no añade el libro si el servidor devuelve un error', async () => {
        const books = new Books()

        server.use(
            http.post('http://localhost:3000/books', () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(books.addBook({
            userId: 2,
            moduleCode: '5021',
            publisher: 'Apunts',
            price: 12,
            pages: 40,
            status: 'good'
        })).rejects.toBeTruthy()

        expect(books.data).toHaveLength(0)
    })

    it('removeBook elimina un libro de this.data', async () => {
        const books = new Books()
        await books.fetchAll()

        await books.removeBook(1)

        expect(books.data).toHaveLength(1)
        expect(books.data[0].id).toBe(2)
    })

    it('removeBook no modifica this.data si el servidor devuelve un error', async () => {
        const books = new Books()
        await books.fetchAll()

        server.use(
            http.delete('http://localhost:3000/books/:id', () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(books.removeBook(1)).rejects.toBeTruthy()

        expect(books.data).toHaveLength(2)
    })

    it('removeBook lanza un error si el libro no existe en this.data', async () => {
        const books = new Books()
        await books.fetchAll()

        await expect(books.removeBook(999)).rejects.toBeTruthy()

        expect(books.data).toHaveLength(2)
    })

    it('changeBook modifica un libro existente', async () => {
        const books = new Books()
        await books.fetchAll()

        const cambios = {
            id: 1,
            userId: 4,
            moduleCode: '5021',
            publisher: 'Editorial nueva',
            price: 18,
            pages: 25,
            status: 'new',
            photo: '',
            comments: '',
            soldDate: ''
        }

        const response = await books.changeBook(cambios)

        expect(response.id).toBe(1)
        expect(response.publisher).toBe('Editorial nueva')
        expect(response.price).toBe(18)
        expect(books.data[0].publisher).toBe('Editorial nueva')
    })

    it('changeBook lanza un error si el libro no existe en this.data', async () => {
        const books = new Books()
        await books.fetchAll()

        await expect(books.changeBook({
            id: 999,
            userId: 2,
            moduleCode: '5021',
            publisher: 'Editorial nueva',
            price: 18,
            pages: 25,
            status: 'new'
        })).rejects.toBeTruthy()
    })
})