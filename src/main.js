import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import logo from './assets/logoBatoi.png'

import View from './view/view.class.js'
import Controller from './controller/controller.class.js'



document.querySelector('#app').innerHTML = `
    <div>
        <img src="${logo}" alt="Logo BatoiBooks">

        <header>
            BatoiBooks
            <span id="cart-count">0</span>
            <span class="material-icons">shopping_cart</span>
        </header>

        <p>Abre la consola para ver el resultado</p>

        <nav>
            <ul>
                <li><a href="#list">Ver Libros</a></li>
                <li><a href="#form">Añadir Libro</a></li>
                <li><a href="#about">Acerca de...</a></li>
            </ul>
        </nav>

        <div id="messages"></div>

        <main>
            <div id="list"></div>

            <div id="form">
                <h2>Añadir libro</h2>

                <form id="bookForm">
                    <div id="book-id" class="hidden">
                        <label for="id">ID:</label>
                        <input id="id" name="id" type="text" readonly>
                    </div>

                    <div>
                        <label for="moduleCode">Module Code:</label>
                        <select id="moduleCode" name="moduleCode" required>
                            <option value="">Selecciona un módulo</option>
                        </select>
                    </div>

                    <div>
                        <label for="publisher">Publisher:</label>
                        <input id="publisher" name="publisher" type="text" required>
                    </div>

                    <div>
                        <label for="price">Price (€):</label>
                        <input id="price" name="price" type="number" min="0" required>
                    </div>

                    <div>
                        <label for="pages">Pages:</label>
                        <input id="pages" name="pages" type="number" min="1" required>
                    </div>

                    <div>
                        <label>Status:</label>
                        <input type="radio" id="new" name="status" value="new" required>new
                        <input type="radio" id="good" name="status" value="good" required>good
                        <input type="radio" id="used" name="status" value="used" required>used
                        <input type="radio" id="bad" name="status" value="bad" required>bad
                        <input type="radio" id="digital" name="status" value="digital" required>digital
                    </div>

                    <div>
                        <label for="photo">Photo:</label>
                        <input id="photo" name="photo" type="url">
                    </div>

                    <div>
                        <label for="comments">Comments:</label>
                        <input id="comments" name="comments">
                    </div>

                    <button type="submit">Save</button>
                    <button type="reset">Reset</button>
                </form>
            </div>

            <div id="about">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget sodales lacus. Integer porttitor dolor nec pulvinar hendrerit.</p>
            </div>

            <div id="not-found">
                <p>La página que buscas no existe.</p>
                <a href="#list">Volver a la lista de libros</a>
            </div>
        </main>

        <footer>Nehuen Polizzil Kifner</footer>
    </div>
`

document.addEventListener('DOMContentLoaded', async () => {
    const view = new View()
    const controller = new Controller(view)

    controller.init()
})
