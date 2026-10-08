import Module from './module.class.js'

export default class Modules {
    constructor() {
        this.data = []
    }

    populate(modules) {
        this.data = modules.map(module => new Module(
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