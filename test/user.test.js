import { describe, test, expect } from 'vitest'
import User from '../src/model/user.class'

const usersFixture = [
    { id: 2, email: "ignasi.gomis.mullor@gmail.com", nick: "Ignasi", password: "1234" },
    { id: 3, email: "juanseguravasco@gmail.com", nick: "Juan", password: "1234" }
]

describe('Clase User', () => {

    test('constructor crea un usuario', () => {
        const newUser = new User(
            usersFixture[0].id,
            usersFixture[0].nick,
            usersFixture[0].email,
            usersFixture[0].password
        )

        expect(newUser).toBeInstanceOf(User)
        expect(newUser).toEqual(usersFixture[0])
    });

    test('toString pinta correctamente el usuario', () => {
        const newUser = new User(
            usersFixture[0].id,
            usersFixture[0].nick,
            usersFixture[0].email,
            usersFixture[0].password
        )

        const texto = newUser.toString()

        expect(texto).toContain(usersFixture[0].id.toString())
        expect(texto).toContain(usersFixture[0].nick)
        expect(texto).toContain(usersFixture[0].email)
    });

})