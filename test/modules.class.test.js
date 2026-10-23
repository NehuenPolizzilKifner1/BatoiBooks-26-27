import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import Modules from '../src/model/modules.class'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Modules — persistencia', () => {
    it('fetchAll carga los módulos del servidor', async () => {
        const modules = new Modules()

        await modules.fetchAll()

        expect(modules.data).toHaveLength(2)
        expect(modules.data[0].code).toBe('5021')
        expect(modules.data[0].cliteral).toBe('Módulo A')
        expect(modules.data[1].code).toBe('5025')
    })

    it('fetchAll guarda los datos devueltos por el servidor', async () => {
        const modules = new Modules()

        server.use(
            http.get('http://localhost:3000/modules', () =>
                HttpResponse.json([
                    {
                        code: '9999',
                        cliteral: 'Módulo de prueba',
                        vliteral: 'Mòdul de prova',
                        courseId: '39'
                    }
                ])
            )
        )

        await modules.fetchAll()

        expect(modules.data).toHaveLength(1)
        expect(modules.data[0].code).toBe('9999')
        expect(modules.data[0].cliteral).toBe('Módulo de prueba')
    })

    it('fetchAll propaga el error si el servidor devuelve un error', async () => {
        const modules = new Modules()

        server.use(
            http.get('http://localhost:3000/modules', () =>
                new HttpResponse(null, { status: 500 })
            )
        )

        await expect(modules.fetchAll()).rejects.toBeTruthy()

        expect(modules.data).toHaveLength(0)
    })
})