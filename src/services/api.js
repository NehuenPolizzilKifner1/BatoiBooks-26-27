const url = import.meta.env.VITE_URL_API

async function getDBBooks() {
    const response = await fetch(url + '/books')

    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data
}

async function getDBUsers() {
    const response = await fetch(url + '/users')

    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data
}

async function getDBModules() {
    const response = await fetch(url + '/modules')

    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data
}

async function addDBBook(newBook) {
    const response = await fetch(url + '/books', {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data
}

async function addDBUser(newUser) {
    const response = await fetch(url + '/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }

    const data = await response.json()
    return data
}

async function removeDBBook(bookId) {
    const response = await fetch(url + '/books/' + bookId, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
}

async function removeDBUser(userId) {
    const response = await fetch(url + '/users/' + userId, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
}

async function changeDBBook(book) {
    const response = await fetch(url + '/books/' + book.id, {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
}

async function changeDBUser(user) {
    const response = await fetch(url + '/users/' + userId, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
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