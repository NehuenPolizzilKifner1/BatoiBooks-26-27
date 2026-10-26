import User from './user.class.js'
import { getDBUsers, addDBUser, removeDBUser, changeDBUser } from '../services/api.js'

export default class Users {
    constructor() {
        this.data = []
    }

    toUser(user) {
        return new User(
            user.id,
            user.nick,
            user.email,
            user.password
        )
    }

    async fetchAll() {
        const usuarios = await getDBUsers()
        this.data = usuarios.map(user => this.toUser(user))
    }

    async addUser(usuario) {
        const user = await addDBUser(usuario)
        const newUser = this.toUser(user)

        this.data.push(newUser)

        return newUser
    }

    async removeUser(removeId) {
        await removeDBUser(removeId)
        const index = this.getUserIndexById(removeId)

        this.data.splice(index, 1)
    }

    async changeUser(payload) {
        const usuarioEditado = await changeDBUser(payload)
        const index = this.getUserIndexById(payload.id)

        const newUser = this.toUser(usuarioEditado)

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
        const indexByID = this.data.findIndex(indexByID => indexByID.id === userId)

        if (indexByID === -1) {
            throw new Error()
        }
        return indexByID
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