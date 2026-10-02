import * as functions from './functions.js'
import './style.css'
import logo from './assets/logoBatoi.png'
import data from './services/datos.js'

document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logo}" alt="Logo BatoiBooks">
        <h1>BatoiBooks</h1>
        <p>Abre la consola para ver el resultado</p>
    </div>
`
console.log(functions.getBookById(data.books, 1))
console.log(functions.getBookIndexById(data.books, 6))
console.log(functions.getUserById(data.users, 2))
console.log(functions.getUserIndexById(data.users, 3))
console.log(functions.getUserByNickName(data.users, "Juan"))
console.log(functions.getModuleByCode(data.modules, "0012"))
console.log(functions.booksFromUser(data.books, 4))
console.log(functions.booksFromModule(data.books, "5025"))
console.log(functions.booksCheeperThan(data.books, 20))
console.log(functions.booksWithStatus(data.books, "good"))
console.log(functions.averagePriceOfBooks(data.books))
console.log(functions.booksOfTypeNotes(data.books))
console.log(functions.booksNotSold(data.books))
console.log(functions.bookExists(data.books, 4, "5021"))
console.log(functions.incrementPriceOfBooks(data.books, 10))