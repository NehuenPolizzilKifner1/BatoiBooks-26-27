import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'
import Cart from '../model/cart.js'

const USER_ID = 2

export default class Controller {

    constructor(view) {
        this.view = view
        this.books = new Books()
        this.modules = new Modules()
        this.cart = new Cart()
        this.editingBookId = null
    }
    
    editBook(id) {
        this.view.navigateTo(`edit/${id}`)
    }

    
    async init() {

        try {

            await this.modules.fetchAll()

            this.modules.data.forEach(module => {
                this.view.renderModuleOptions(module)
            })

            await this.books.fetchAll()

            this.books.data.forEach(book => {
                this.view.renderBook(book, this.modules.data, USER_ID)
            })

            this.view.bindEvents(this.saveBook.bind(this), this.removeBook.bind(this), this.editBook.bind(this), this.addToCart.bind(this), this.handleRoute.bind(this), this.resetForm.bind(this))

            this.handleRoute(this.view.getCurrentRoute())
        } catch (error) {
            this.view.showMessage('error', 'No se han podido cargar los datos del servidor')
        }
    }

    async saveBook(bookData) {
        try {
            if (this.editingBookId === null) {
                const newBook = {
                    ...bookData,
                    userId: USER_ID,
                    soldDate: ''
                }

                const book = await this.books.addBook(newBook)

                this.view.renderBook(book, this.modules.data, USER_ID)
                this.view.showMessage('info', 'Libro añadido correctamente.')
            } else {
                const oldBook = this.books.getBookById(this.editingBookId)

                const updatedBook = {
                    ...oldBook,
                    ...bookData,
                    id: this.editingBookId
                }

                const book = await this.books.changeBook(updatedBook)

                this.view.updateBookCard(book, this.modules.data, USER_ID)
                this.view.showMessage('info', 'Libro actualizado correctamente.')
            }

            this.editingBookId = null
            this.view.navigateTo('list')

        } catch (error) {
            this.view.showMessage('error', 'No se ha podido guardar el libro.')
        }
    }

    async removeBook(id) {
        try {
            const book = this.books.getBookById(id)
            const module = this.modules.getModuleByCode(book.moduleCode)

            const message = `¿Estás seguro de que quieres borrar el libro ${book.id} del módulo ${module.cliteral}?`

            const confirmed = this.view.confirmDelete(message)

            if (confirmed) {
                await this.books.removeBook(id)
                this.view.removeBookCard(id)
                this.view.showMessage('info', 'Libro eliminado correctamente.')
            }
        } catch (error) {
            this.view.showMessage('error', 'No se ha podido eliminar el libro.')
        }
    }

    handleRoute(hash) {
        const route = hash.replace('#', '')

        if (route.startsWith('edit/')) {
            const id = Number(route.split('/')[1])
            this.loadBookToEdit(id)
            return
        }

        switch (route) {
            case '':
            case 'list':
                this.view.showPage('list')
                break

            case 'form':
                this.editingBookId = null
                this.view.showPage('form')
                this.view.resetBookForm()
                this.view.setFormMode('add')
                break

            case 'about':
                this.view.showPage('about')
                break

            default:
                this.view.showPage('not-found')
                break
        }
    }

    loadBookToEdit(id) {
        try {
            const book = this.books.getBookById(id)

            if (Number(book.userId) !== USER_ID) {
                this.view.showMessage('error', 'No puedes editar un libro que no es tuyo.')
                this.view.navigateTo('list')
                return
            }

            this.view.showPage('form')
            this.view.setFormMode('edit')
            this.view.fillBookForm(book)
            this.editingBookId = id

        } catch (error) {
            this.view.showPage('not-found')
        }
    }

    resetForm() {
        this.view.navigateTo('form')
    }

    addToCart(id) {
        try {
            const book = this.books.getBookById(id)
            const added = this.cart.addBook(book)

            if (added) {
                this.view.updateCartCount(this.cart.data.length)
                console.log(this.cart.data)
                this.view.showMessage('info', 'Libro añadido al carrito.')
            } else {
                this.view.showMessage('error', 'No se puede añadir este libro al carrito.')
            }
        } catch (error) {
            this.view.showMessage('error', 'No se ha podido añadir el libro al carrito.')
        }
    }
}