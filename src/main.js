import './style.css'
import logo from './assets/logoBatoi.png'
import data from './services/datos.js'


import Books from './model/books.class.js'
import Users from './model/users.class.js'
import Modules from './model/modules.class.js'

document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logo}" alt="Logo BatoiBooks">
        <h1>BatoiBooks</h1>
        <p>Abre la consola para ver el resultado</p>
    </div>
`

const books = new Books()
const users = new Users()
const modules = new Modules()

books.populate(data.books)
users.populate(data.users)
modules.populate(data.modules)

console.log(books.booksFromModule("5021"))
console.log(books.booksWithStatus("good"))
console.log(books.incrementPriceOfBooks())
