import Module from './module.class.js'
import { getDBModules } from '../services/api.js'

export default class Modules {
    constructor() {
        this.data = []
    }

    async fetchAll() {
        const modulos = await getDBModules()
        this.data = modulos.map(module => new Module(
            module.code,
            module.cliteral,
            module.vliteral,
            module.courseId
        ))
    }

    getModuleByCode(moduleCode) {
        const module = this.data.find(module => module.code === moduleCode)

        if (!module) {
            throw new Error()
        }
        return module

    }

    toString() {
        return this.data.map(module => module.toString()).join("\n")
    }
}