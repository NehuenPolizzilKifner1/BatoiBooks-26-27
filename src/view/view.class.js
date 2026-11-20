export default class View {

    bindEvents(onSaveBook, onRemoveBook, onEditBook, onAddToCart, onRouteChange, onResetForm, onModuleChange) {

        document.getElementById('bookForm').addEventListener('submit', (event) => {

            event.preventDefault()

            if (!this.validateForm()) {
                return
            }

            const bookData = {
                moduleCode: document.getElementById('moduleCode').value,
                publisher: document.getElementById('publisher').value,
                price: Number(document.getElementById('price').value),
                pages: Number(document.getElementById('pages').value),
                status: document.querySelector('input[name="status"]:checked').value,
                photo: document.getElementById('photo').value,
                comments: document.getElementById('comments').value,
            }

            onSaveBook(bookData)

        })

        document.getElementById('bookForm').addEventListener('reset', () => {
            this.clearValidation()
            onResetForm()
        })

        document.getElementById('list').addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]')

            if (!button) {
                return
            }

            const card = button.closest('.card')

            if (!card) {
                return
            }

            const id = Number(card.dataset.id)
            const action = button.dataset.action

            if (action === 'delete') {
                onRemoveBook(id)
            } else if (action === 'edit') {
                onEditBook(id)
            } else if (action === 'cart') {
                onAddToCart(id)
            }
        })

        window.addEventListener('hashchange', () => {
            onRouteChange(window.location.hash)
        })

        const fields = document.querySelectorAll('#moduleCode, #publisher, #price, #pages, input[name="status"]')

        fields.forEach(field => {
            const eventType = field.type === 'radio' || field.tagName === 'SELECT'
                ? 'change'
                : 'input'

            field.addEventListener(eventType, () => {
                if (field.name === 'moduleCode') {
                    this.setModuleError('')
                    this.validateForm(field.name)
                    onModuleChange(field.value)
                } else {
                    this.validateForm(field.name)
                }
            })
        })
    }

    // Muestra una página y oculta las demás
    showPage(pageId) {
        const pages = document.querySelectorAll('main > div')

        pages.forEach(page => {
            page.classList.add('hidden')
        })

        const selectedPage = document.getElementById(pageId)

        if (selectedPage) {
            selectedPage.classList.remove('hidden')
        }
    }

    // Cambia la ruta de la aplicación
    navigateTo(route) {
        window.location.hash = route
    }

    // Devuelve la ruta actual
    getCurrentRoute() {
        return window.location.hash
    }

    renderModuleOptions(module) {
        const llistatModulos = document.getElementById('moduleCode')

        const moduleUI = document.createElement('option')

        moduleUI.value = module.code
        moduleUI.textContent = module.cliteral

        llistatModulos.append(moduleUI)
    }

    renderBook(book, modules, userId) {
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
        price.textContent = `${book.price} €`

        const actions = document.createElement('div')
        actions.className = 'book-actions'

        if (Number(book.userId) === userId) {
            const editButton = document.createElement('button')
            editButton.type = 'button'
            editButton.setAttribute('aria-label', 'Editar')
            editButton.dataset.action = 'edit'
            editButton.innerHTML = '<span class="material-icons">edit</span>'

            const deleteButton = document.createElement('button')
            deleteButton.type = 'button'
            deleteButton.setAttribute('aria-label', 'Borrar')
            deleteButton.dataset.action = 'delete'
            deleteButton.innerHTML = '<span class="material-icons">delete</span>'

            actions.append(editButton, deleteButton)
        } else {
            const cartButton = document.createElement('button')
            cartButton.type = 'button'
            cartButton.setAttribute('aria-label', 'Añadir al carrito')
            cartButton.dataset.action = 'cart'
            cartButton.innerHTML = '<span class="material-icons">add_shopping_cart</span>'

            actions.append(cartButton)
        }

        content.append(title, publisher, pages, status, sold, comments, price, actions)
        bookUI.append(image, content)

        llistatLibros.append(bookUI)
    }

    removeBookCard(id) {
        const bookUI = document.querySelector(`#list .card[data-id="${id}"]`)

        if (bookUI) {
            bookUI.remove()
        }

    }

    updateBookCard(book, modules, userId) {
        const bookUI = document.querySelector(`#list .card[data-id="${book.id}"]`)

        if (!bookUI) {
            this.renderBook(book, modules, userId)
            return
        }

        const nextBook = bookUI.nextElementSibling

        bookUI.remove()

        this.renderBook(book, modules, userId)

        const updatedBookUI = document.querySelector(`#list .card[data-id="${book.id}"]`)

        if (nextBook) {
            document.getElementById('list').insertBefore(updatedBookUI, nextBook)
        }
    }

    resetBookForm() {
        document.getElementById('bookForm').reset()
        document.getElementById('id').value = ''
        this.setFormMode('add')
        this.clearValidation()
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

    setFormMode(mode) {
        const title = document.querySelector('#form h2')
        const bookId = document.getElementById('book-id')

        if (mode === 'edit') {
            title.textContent = 'Editar libro'
            bookId.classList.remove('hidden')
        } else {
            title.textContent = 'Añadir libro'
            bookId.classList.add('hidden')
        }
    }

    fillBookForm(book) {

        this.clearValidation()

        document.getElementById('id').value = book.id
        document.getElementById('moduleCode').value = book.moduleCode
        document.getElementById('publisher').value = book.publisher
        document.getElementById('price').value = book.price
        document.getElementById('pages').value = book.pages
        document.getElementById('photo').value = book.photo
        document.getElementById('comments').value = book.comments

        document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true
    }

    confirmDelete(message) {
        return window.confirm(message)
    }

    updateCartCount(count) {
        document.getElementById('cart-count').textContent = count
    }

    validateForm(fieldName = null) {
        const fields = {
            moduleCode: document.getElementById('moduleCode'),
            publisher: document.getElementById('publisher'),
            price: document.getElementById('price'),
            pages: document.getElementById('pages'),
            status: document.querySelector('input[name="status"]')
        }

        let isValid = true

        for (const name in fields) {
            const field = fields[name]

            if (fieldName !== null && fieldName !== name) {
                continue
            }

            const error = document.getElementById(`${name}-error`)

            error.textContent = ''

            if (field.validity.valueMissing) {
                error.textContent = 'Este campo es obligatorio.'
                isValid = false
            } else if (field.validity.customError) {
                error.textContent = field.validationMessage
                isValid = false
            } else if (field.validity.badInput) {
                error.textContent = 'Introduce un valor válido.'
                isValid = false
            } else if (field.validity.rangeUnderflow) {
                error.textContent = name === 'price'
                    ? 'El precio no puede ser negativo.'
                    : 'El número de páginas debe ser como mínimo 1.'
                isValid = false
            } else if (name === 'pages' && !Number.isInteger(Number(field.value))) {
                error.textContent = 'El número de páginas debe ser un número entero.'
                isValid = false
            } else if (name === 'price' && field.validity.stepMismatch) {
                error.textContent = 'El precio debe tener como máximo dos decimales.'
                isValid = false
            }
        }

        return isValid
    }

    clearValidation() {
        
        const fields = [
            'moduleCode',
            'publisher',
            'price',
            'pages',
            'status'
        ]

        fields.forEach(name => {
            document.getElementById(`${name}-error`).textContent = ''
        })

        document.getElementById('moduleCode').setCustomValidity('')
    }

    setModuleError(message) {
        const field = document.getElementById('moduleCode')
        const error = document.getElementById('moduleCode-error')

        field.setCustomValidity(message)
        error.textContent = message
    }
}

