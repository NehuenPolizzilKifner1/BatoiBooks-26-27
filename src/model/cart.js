export default class Cart {
    constructor() {
        this.data = []
    }

    addBook(book) {
        if (book.soldDate) {
            return false
        }

        const exists = this.data.some(item => item.id === book.id)

        if (exists) {
            return false
        }

        this.data.push({ ...book })

        return true
    }
}