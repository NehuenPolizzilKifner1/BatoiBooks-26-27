import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Users from '../src/model/users.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users — persistencia', () => {
    it('fetchAll carga los usuarios del servidor', async () => {
        const users = new Users()

        await users.fetchAll()

        expect(users.data).toHaveLength(2)
        expect(users.data[0].id).toBe(2)
        expect(users.data[1].nick).toBe('Maria')
    })

    it('addUser crea un usuario y lo añade a this.data', async () => {
        const users = new Users()
        const nuevo = {
            nick: 'prueba',
            email: 'prueba@example.com',
            password: '1234'
        }

        const response = await users.addUser(nuevo)

        expect(response.id).toBe(999)
        expect(response.nick).toBe('prueba')
        expect(response.email).toBe('prueba@example.com')
        expect(users.data).toHaveLength(1)
        expect(users.data[0].id).toBe(999)
    })

    it('addUser no añade el usuario si el servidor devuelve un error', async () => {
        const users = new Users()

        server.use(
            http.post('http://localhost:3000/users', () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.addUser({
            nick: 'prueba',
            email: 'prueba@example.com',
            password: '1234'
        })).rejects.toBeTruthy()

        expect(users.data).toHaveLength(0)
    })

    it('removeUser elimina un usuario de this.data', async () => {
        const users = new Users()
        await users.fetchAll()

        await users.removeUser(2)

        expect(users.data).toHaveLength(1)
        expect(users.data[0].id).toBe(4)
    })

    it('removeUser no modifica this.data si el servidor devuelve un error', async () => {
        const users = new Users()
        await users.fetchAll()

        server.use(
            http.delete('http://localhost:3000/users/:id', () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(users.removeUser(2)).rejects.toBeTruthy()

        expect(users.data).toHaveLength(2)
    })

    it('removeUser lanza un error si el usuario no existe en this.data', async () => {
        const users = new Users()
        await users.fetchAll()

        await expect(users.removeUser(999)).rejects.toBeTruthy()

        expect(users.data).toHaveLength(2)
    })

    it('changeUser modifica un usuario existente', async () => {
        const users = new Users()
        await users.fetchAll()

        const cambios = {
            id: 2,
            nick: 'IgnasiNuevo',
            email: 'nuevo@example.com',
            password: '5678'
        }

        const response = await users.changeUser(cambios)

        expect(response.id).toBe(2)
        expect(response.nick).toBe('IgnasiNuevo')
        expect(response.email).toBe('nuevo@example.com')
        expect(users.data[0].nick).toBe('IgnasiNuevo')
    })

    it('changeUser lanza un error si el usuario no existe en this.data', async () => {
        const users = new Users()
        await users.fetchAll()

        await expect(users.changeUser({
            id: 999,
            nick: 'No existe',
            email: 'noexiste@example.com',
            password: '1234'
        })).rejects.toBeTruthy()
    })
})