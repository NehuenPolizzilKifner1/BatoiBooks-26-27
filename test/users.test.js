import { describe, test, expect } from 'vitest'
import Users from '../src/model/users.class'
import User from '../src/model/user.class'

const usersFixture = [
    {
        id: 2,
        email: "ignasi.gomis.mullor@gmail.com",
        nick: "Ignasi",
        password: "1234"
    },
    {
        email: "juanseguravasco@gmail.com",
        nick: "Juan",
        id: 3,
        password: "1234"
    },
    {
        email: "marta@gmail.lan",
        nick: "Marta",
        id: 4,
        password: "1234"
    },
    {
        email: "Ximo@gmail.lan",
        nick: "Ximo",
        id: 5,
        password: "1234"
    }
]

describe('Clase Users', () => {

    test('constructor crea una colección vacía', () => {
        const newUsers = new Users()

        expect(newUsers).toBeInstanceOf(Users)
        expect(newUsers.data).toEqual([])
    })

    test('populate crea los usuarios y los guarda en data', () => {
        const newUsers = new Users()

        newUsers.populate(usersFixture)

        expect(newUsers.data).toHaveLength(4)
        expect(newUsers.data[0]).toBeInstanceOf(User)
        expect(newUsers.data[1]).toBeInstanceOf(User)
        expect(newUsers.data[2]).toBeInstanceOf(User)
        expect(newUsers.data[3]).toBeInstanceOf(User)
    })

    test('addUser añade un usuario', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const datosNuevoUsuario = {
            nick: 'Nehuen',
            email: 'nehuen@gmail.com',
            password: '1234'
        }

        const newUser = newUsers.addUser(datosNuevoUsuario)

        expect(newUser).toBeInstanceOf(User)
        expect(newUsers.data).toHaveLength(5)
        expect(newUser.id).toBe(6)
        expect(newUser.nick).toBe('Nehuen')
    })

    test('removeUser elimina un usuario', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        newUsers.removeUser(2)

        expect(newUsers.data).toHaveLength(3)
        expect(newUsers.data[0].id).toBe(3)
    })

    test('removeUser lanza un error si el usuario no existe', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const cantidadAntes = newUsers.data.length

        expect(() => newUsers.removeUser(999)).toThrow()
        expect(newUsers.data).toHaveLength(cantidadAntes)
    })

    test('changeUser modifica un usuario existente', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const newData = {
            id: 2,
            nick: 'IgnasiNuevo',
            email: 'nuevo@gmail.com',
            password: '9999'
        }

        const response = newUsers.changeUser(newData)

        expect(response).toBeInstanceOf(User)
        expect(response.id).toBe(2)
        expect(response.nick).toBe('IgnasiNuevo')
        expect(response.email).toBe('nuevo@gmail.com')
        expect(newUsers.data[0].nick).toBe('IgnasiNuevo')
    })

    test('changeUser lanza un error si el usuario no existe', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        expect(() => newUsers.changeUser({
            id: 999,
            nick: 'Pedro',
            email: 'pedro@gmail.com',
            password: '1234'
        })).toThrow()
    })

    test('getUserById devuelve el usuario con id 2', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const response = newUsers.getUserById(2)

        expect(response.id).toBe(2)
        expect(response.nick).toBe('Ignasi')
    })

    test('getUserById devuelve un error si el usuario no existe', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        expect(() => newUsers.getUserById(999)).toThrow()
    })

    test('getUserIndexById devuelve el índice del usuario', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const response = newUsers.getUserIndexById(2)

        expect(response).toBe(0)
    })

    test('getUserIndexById devuelve un error si el usuario no existe', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        expect(() => newUsers.getUserIndexById(999)).toThrow()
    })

    test('getUserByNickName devuelve el usuario con nick Ignasi', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const response = newUsers.getUserByNickName('Ignasi')

        expect(response.id).toBe(2)
        expect(response.nick).toBe('Ignasi')
    })

    test('getUserByNickName devuelve un error si el nick no existe', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        expect(() => newUsers.getUserByNickName('Nehuen')).toThrow()
    })

    test('toString devuelve los usuarios como texto', () => {
        const newUsers = new Users()
        newUsers.populate(usersFixture)

        const texto = newUsers.toString()

        expect(texto).toContain('2')
        expect(texto).toContain('Ignasi')
        expect(texto).toContain('3')
        expect(texto).toContain('Juan')
        expect(texto).toContain('4')
        expect(texto).toContain('Marta')
        expect(texto).toContain('5')
        expect(texto).toContain('Ximo')
    })
})