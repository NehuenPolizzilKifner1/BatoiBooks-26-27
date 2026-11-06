import Books from '../model/books.class.js'
import Modules from '../model/modules.class.js'

const USER_ID = 1

export default class Controller {

    constructor(view) {
        this.view = view
        this.books = new Books()
        this.modules = new Modules()
    }

    async init() {

        try {

            await this.modules.fetchAll()

            this.modules.data.forEach(module => {
                this.view.renderModuleOptions(module)
            })

            await this.books.fetchAll()

            this.books.data.forEach(book => {
                this.view.renderBook(book, this.modules.data)
            })

            this.view.bindEvents(this.addBook.bind(this), this.removeBook.bind(this))

        } catch (error) {
            this.view.showMessage('error', 'No se han podido cargar los datos del servidor')
        }
    }

    async addBook(bookData) {

        const newBook = {
            ...bookData,
            userId: USER_ID
        }

        try {

            const book = await this.books.addBook(newBook)
            this.view.renderBook(book, this.modules.data)
            this.view.resetBookForm()
            this.view.showMessage('info', 'Libro añadido correctamente.')

        } catch (error) {
            this.view.showMessage('error', 'No se ha podido añadir el libro.')
        }
    }

    async removeBook(id) {

        try {

            await this.books.removeBook(id)
            this.view.removeBookCard(id)
            this.view.showMessage('info', 'Libro eliminado correctamente.')

        } catch (error) {
            this.view.showMessage('error', 'No se ha podido eliminar el libro.')
        }
    }
}