import User from './user.class.js'

export default class Users {
    constructor() {
        this.data = []
    }

    populate(users) {
        this.data = users.map(user => new User(
            user.id,
            user.nick,
            user.email,
            user.password
        ))
    }

    addUser(usuario) {
        const newId = Math.max(...this.data.map(user => user.id)) + 1
        const newUser = new User(newId, usuario.nick, usuario.email, usuario.password)

        this.data.push(newUser)

        return newUser
    }

    removeUser(removeId) {
        const index = this.data.findIndex(user => user.id === removeId)

        if (index === -1) {
            throw new Error()
        }

        this.data.splice(index, 1)
    }

    changeUser(payload) {
        const index = this.data.findIndex(user => user.id === payload.id)

        if (index === -1) {
            throw new Error()
        }

        const newUser = new User(payload.id, payload.nick, payload.email, payload.password)

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