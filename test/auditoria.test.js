// @vitest-environment jsdom
import { test, expect } from 'vitest'
import { loadApp, card, BOOKS } from './helpers.js'

test('la editorial se muestra como texto y no se interpreta como HTML', async () => {
    const editorialMaliciosa = '<img src=x onerror=alert(1)>'

    await loadApp({
        books: [{ ...BOOKS[0], publisher: editorialMaliciosa }]
    })

    const tarjeta = card(BOOKS[0].id)
    const editorial = tarjeta.querySelector('h4')

    expect(editorial.textContent).toBe(editorialMaliciosa)
    expect(editorial.querySelector('img')).toBeNull()
})