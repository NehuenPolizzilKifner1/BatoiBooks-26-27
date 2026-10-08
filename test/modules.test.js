import { describe, test, expect } from 'vitest'
import Modules from '../src/model/modules.class'

const modulesFixture = [
    {
        code: "0011",
        cliteral: "Didáctica de la educación infantil",
        vliteral: "Didàctica de l'educación infantil",
        courseId: "39"
    },
    {
        code: "0012",
        cliteral: "Autonomía personal y salud infantil",
        vliteral: "Autonomia personal i salut infantil",
        courseId: "39"
    }
]

describe('Clase Modules', () => {

    test('constructor crea una colección vacía', () => {
        const modules = new Modules()

        expect(modules.data).toEqual([])
    })

    test('populate crea los módulos y los guarda en data', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        expect(modules.data.length).toBe(2)
        expect(modules.data[0].code).toBe("0011")
    })

    test('getModuleByCode devuelve el módulo con código 0011', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        const response = modules.getModuleByCode("0011")

        expect(response.code).toBe("0011")
    })

    test('getModuleByCode lanza un error si el módulo no existe', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        expect(() => modules.getModuleByCode("9999")).toThrow()
    })

    test('toString devuelve los módulos como texto', () => {
        const modules = new Modules()

        modules.populate(modulesFixture)

        const response = modules.toString()

        expect(response).toContain("0011")
        expect(response).toContain("0012")
    })
})