import { describe, test, expect } from 'vitest'
import Module from '../src/model/module.class'

const moduleFixture = {
    code: "0011",
    cliteral: "Didáctica de la educación infantil",
    vliteral: "Didàctica de l'educación infantil",
    courseId: "39"
}

describe('Clase Module', () => {

    test('constructor crea correctamente el módulo', () => {
        const newModule = new Module(
            moduleFixture.code,
            moduleFixture.cliteral,
            moduleFixture.vliteral,
            moduleFixture.courseId
        )

        expect(newModule).toBeInstanceOf(Module)
        expect(newModule).toEqual(moduleFixture)
    });

    test('toString pinta correctamente el módulo', () => {
        const newModule = new Module(
            moduleFixture.code,
            moduleFixture.cliteral,
            moduleFixture.vliteral,
            moduleFixture.courseId
        )

        const texto = newModule.toString()

        expect(texto).toContain(moduleFixture.code)
        expect(texto).toContain(moduleFixture.cliteral)
        expect(texto).toContain(moduleFixture.vliteral)
        expect(texto).toContain(moduleFixture.courseId)
    });

})