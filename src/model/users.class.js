import User from './user.class.js'
import { getDBUsers, addDBUser, removeDBUser, changeDBUser } from '../services/api.js'

export default class Users {
    constructor() {
        this.data = []
    }

    async fetchAll() {
        const usuarios = await getDBUsers()
        this.data = usuarios.map(user => new User(
            user.id,
            user.nick,
            user.email,
            user.password
        ))
    }

    async addUser(usuario) {
        const user = await addDBUser(usuario)
        const newUser = new User(user.id, user.nick, user.email, user.password)

        this.data.push(newUser)

        return newUser
    }

    async removeUser(removeId) {
        await removeDBUser(removeId)
        const index = this.data.findIndex(user => user.id === removeId)

        if (index === -1) {
            throw new Error()
        }

        this.data.splice(index, 1)
    }

    async changeUser(payload) {
        const usuarioEditado = await changeDBUser(payload)
        const index = this.data.findIndex(user => user.id === payload.id)

        if (index === -1) {
            throw new Error()
        }

        const newUser = new User(usuarioEditado.id, usuarioEditado.nick, usuarioEditado.email, usuarioEditado.password)

        this.data[index] = newUser

        return newUser
    }

    getUserById(userId) {
        const user = this.data.find(user => user.id === userId)

        if (!user) {
            throw new Error()
        }
        return user
    }

    getUserIndexById(userId) {
        const userByID = this.data.findIndex(userByID => userByID.id === userId)

        if (userByID === -1) {
            throw new Error()
        }
        return userByID
    }

    getUserByNickName(userNick) {
        const user = this.data.find(user => user.nick === userNick)

        if (!user) {
            throw new Error()
        }
        return user
    }

    toString() {
        return this.data.map(user => user.toString()).join("\n")
    }
}