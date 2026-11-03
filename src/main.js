import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import logo from './assets/logoBatoi.png'

import Books from './model/books.class.js'
import Modules from './model/modules.class.js'

const USER_ID = 1

document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logo}" alt="Logo BatoiBooks">
        <header>BatoiBooks</header>
        <p>Abre la consola para ver el resultado</p>
        <nav>
            <ul>
                <li><a href="#list">Ver Libros</a></li>
                <li><a href="#form">Añadir Libro</a></li>
                <li><a href="#about">Acerca de...</a></li>
            </ul>
        </nav>
        <div id="list"></div>
        <div id="messages"></div>
        <div id="remove">
            <label>Id: </label>
            <input id="id-remove"></input>
            <button id="remove-btn">Borrar</button>
        </div>
        <div id="form">
            <form id="bookForm">
                <div>
                    <label>Module Code: </label>
                    <select id="moduleCode" name="moduleCode" required>
                        <option value="">Selecciona un módulo</option>
                    </select>
                </div>
                <div>
                    <label>Publisher: </label>
                    <input id="publisher" name="publisher" type="text" required>
                </div>
                <div>
                    <label>Price (€): </label>
                    <input id="price" name="price" type="number" required>
                </div>
                <div>
                    <label>Pages: </label>
                    <input id="pages" name="pages" type="number" required>
                </div>
                <div>
                    <label>Status: </label>
                    <input type="radio" id="new" name="status" value="new" required>new</input>
                    <input type="radio" id="good" name="status" value="good" required>good</input>
                    <input type="radio" id="used" name="status" value="used" required>used</input>
                    <input type="radio" id="bad" name="status" value="bad" required>bad</input>
                    <input type="radio" id="digital" name="status" value="digital" required>digital</input>
                </div>
                <div>
                    <label>Photo: </label>
                    <input id="photo" name="photo" type="url">
                </div>
                <div>
                    <label>Comments: </label>
                    <input id="comments" name="comments">
                </div>
                <button type="submit">Save</button>
                <button type="reset">Reset</button>
            </form>
        </div>
        <div id="about">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget sodales lacus. Integer porttitor dolor nec pulvinar hendrerit.</p>
        </div>
        <footer>Nehuen Polizzil Kifner</footer>
    </div>
`
document.addEventListener('DOMContentLoaded', async () => {
    const books = new Books()
    const modules = new Modules()

    try {
        await modules.fetchAll()
        modules.data.forEach(module => renderModuleOptions(module))

        await books.fetchAll()
        books.data.forEach(book => renderBook(book, modules.data))

    } catch (error) {
        showMessage('error', 'No se han podido cargar los datos del servidor')
        return
    }

    document.getElementById('remove-btn').addEventListener('click', async (event) => {

        event.preventDefault()

        const id = document.getElementById('id-remove').value

        if (!id) {
            showMessage('error', 'Debes introducir un ID.')
            return
        }

        try {
            await books.removeBook(Number(id))

            // Eliminamos la tarjeta de la página
            const bookUI = document.querySelector(`#list .card[data-id="${id}"]`)

            if (bookUI) {
                bookUI.remove()
            }

            // Limpiamos el input
            document.getElementById('id-remove').value = ''

            showMessage('info', 'Libro eliminado correctamente.')
        } catch {
            showMessage('error', 'No se ha podido eliminar el libro.')
        }
    })

    document.getElementById('bookForm').addEventListener('submit', async (event) => {

        event.preventDefault()

        const newBook = {
            moduleCode: document.getElementById('moduleCode').value,
            publisher: document.getElementById('publisher').value,
            price: Number(document.getElementById('price').value),
            pages: Number(document.getElementById('pages').value),
            status: document.querySelector('input[name="status"]:checked').value,
            photo: document.getElementById('photo').value,
            comments: document.getElementById('comments').value,
            userId: USER_ID,
            soldDate: ''
        }

        try {

            // Guardamos el libro en el servidor
            const book = await books.addBook(newBook)

            // Mostramos el libro en la página
            renderBook(book, modules.data)

            // Limpiamos el formulario
            document.getElementById('bookForm').reset()

            // Mostramos un mensaje
            showMessage('info', 'Libro añadido correctamente.')

        } catch (error) {
            showMessage('error', 'No se ha podido añadir el libro.')
        }
    })
})


function renderModuleOptions(module) {
    const llistatModulos = document.getElementById('moduleCode')

    const moduleUI = document.createElement('option')

    moduleUI.value = module.code
    moduleUI.textContent = module.cliteral

    llistatModulos.append(moduleUI)
}

function renderBook(book, modules) {
    const llistatLibros = document.getElementById('list')

    const bookUI = document.createElement('div')
    bookUI.className = 'card'
    bookUI.dataset.id = book.id

    const module = modules.find(module => module.code === book.moduleCode)
    const moduleName = module ? module.cliteral : book.moduleCode

    bookUI.innerHTML = `
        <img src="${book.photo}" alt="Libro: ${book.id}">
        <div>
            <h3>${moduleName} (${book.id})</h3>
            <h4>${book.publisher}</h4>
            <p>${book.pages} páginas</p>
            <p>Estado: ${book.status}</p>
            <p>${book.soldDate ? 'Vendido el ' + new Date(book.soldDate).toLocaleDateString('es-ES') : 'En venta'}</p>
            <p>${book.comments}</p>
            <h4>${book.price}€</h4>
        </div>
    `

    llistatLibros.append(bookUI)
}



function showMessage(type, message) {

    const messages = document.getElementById('messages')
    const messageUI = document.createElement('div')

    // Asignamos las clases de Bootstrap
    let alertClass = 'alert-info'

    if (type === 'error') {
        alertClass = 'alert-danger'
    }

    messageUI.className = `alert ${alertClass}`
    messageUI.setAttribute('role', 'alert')

    // Creamos el texto del mensaje
    const text = document.createElement('span')
    text.textContent = message

    // Creamos el botón para cerrar
    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.className = 'btn-close'
    closeButton.setAttribute('aria-label', 'Cerrar')

    // Añadimos los elementos al mensaje
    messageUI.append(text, closeButton)

    // Mostramos el mensaje
    messages.append(messageUI)

    // Evento para cerrar el mensaje
    closeButton.addEventListener('click', () => {
        messageUI.remove()
    })

    if (type === 'info') {
        setTimeout(() => { messageUI.remove() }, 3000)
    }
}