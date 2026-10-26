const url = import.meta.env.VITE_URL_API

async function request(path, options = {}) {
    const response = await fetch(url + path, options)

    if (!response.ok) {
        throw new Error(
            `Error ${response.status} de la BBDD: ${response.statusText}`
        )
    }

    const text = await response.text()

    if (!text) {
        return undefined
    }

    return JSON.parse(text)
}

async function getDBBooks() {
    return await request('/books')
}

async function getDBUsers() {
    return await request('/users')
}

async function getDBModules() {
    return await request('/modules')
}

async function addDBBook(newBook) {
    return await request('/books', {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function addDBUser(newUser) {
    return await request('/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function removeDBBook(bookId) {
    await request('/books/' + bookId, {
        method: 'DELETE'
    })
}

async function removeDBUser(userId) {
    await request('/users/' + userId, {
        method: 'DELETE'
    })
}

async function changeDBBook(book) {
    return await request('/books/' + book.id, {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function changeDBUser(user) {
    return await request('/users/' + user.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getDBBooks,
    getDBUsers,
    getDBModules,
    addDBBook,
    addDBUser,
    removeDBBook,
    removeDBUser,
    changeDBBook,
    changeDBUser
}
