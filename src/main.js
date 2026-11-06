import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import logo from './assets/logoBatoi.png'

import View from './view/view.class.js'
import Controller from './controller/controller.class.js'


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
    const view = new View()
    const controller = new Controller(view)

    controller.init()
})


