export default class View {

    bindEvents(onAddBook, onRemoveBook) {
        document.getElementById('remove-btn').addEventListener('click', (event) => {

            event.preventDefault()

            const id = document.getElementById('id-remove').value

            if (!id) {
                this.showMessage('error', 'Debes introducir un ID.')
                return
            }

            onRemoveBook(Number(id))

        })

        document.getElementById('bookForm').addEventListener('submit', (event) => {

            event.preventDefault()

            const newBook = {
                moduleCode: document.getElementById('moduleCode').value,
                publisher: document.getElementById('publisher').value,
                price: Number(document.getElementById('price').value),
                pages: Number(document.getElementById('pages').value),
                status: document.querySelector('input[name="status"]:checked').value,
                photo: document.getElementById('photo').value,
                comments: document.getElementById('comments').value,
                soldDate: ''
            }

            onAddBook(newBook)

        })
    }

    renderModuleOptions(module) {
        const llistatModulos = document.getElementById('moduleCode')

        const moduleUI = document.createElement('option')

        moduleUI.value = module.code
        moduleUI.textContent = module.cliteral

        llistatModulos.append(moduleUI)
    }

    renderBook(book, modules) {
        const llistatLibros = document.getElementById('list')

        const bookUI = document.createElement('div')
        bookUI.className = 'card'
        bookUI.dataset.id = book.id

        const module = modules.find(module => module.code === book.moduleCode)
        const moduleName = module ? module.cliteral : book.moduleCode

        const image = document.createElement('img')
        image.src = book.photo
        image.alt = `Libro: ${book.id}`

        const content = document.createElement('div')

        const title = document.createElement('h3')
        title.textContent = `${moduleName} (${book.id})`

        const publisher = document.createElement('h4')
        publisher.textContent = book.publisher

        const pages = document.createElement('p')
        pages.textContent = `${book.pages} páginas`

        const status = document.createElement('p')
        status.textContent = `Estado: ${book.status}`

        const sold = document.createElement('p')
        sold.textContent = book.soldDate ? 'Vendido el ' + new Date(book.soldDate).toLocaleDateString('es-ES') : 'En venta'

        const comments = document.createElement('p')
        comments.textContent = book.comments

        const price = document.createElement('h4')
        price.textContent = `${book.price}€`

        content.append(title, publisher, pages, status, sold, comments, price)
        bookUI.append(image, content)

        llistatLibros.append(bookUI)
    }

    removeBookCard(id) {
        const bookUI = document.querySelector(`#list .card[data-id="${id}"]`)

        if (bookUI) {
            bookUI.remove()
        }

        document.getElementById('id-remove').value = ''
    }

    resetBookForm() {
        document.getElementById('bookForm').reset()
    }

    showMessage(type, message) {

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

        messageUI.append(text, closeButton)

        messages.append(messageUI)

        closeButton.addEventListener('click', () => {
            messageUI.remove()
        })

        if (type === 'info') {
            setTimeout(() => { messageUI.remove() }, 3000)
        }
    }
}

