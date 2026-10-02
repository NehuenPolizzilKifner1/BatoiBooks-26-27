import { describe, it, expect } from 'vitest'
import * as functions from '../src/functions'
import data from '../src/services/datos'

const books = data.books
const users = data.users
const modules = data.modules

//1

describe('function getBookById', () => {
  it('getBookById 1 devuelve el libro con id 1', () => {
    const response = functions.getBookById(books, 1)
    expect(response.id).toBe(1)
  });

  it('getBookById 22 devuelve un error', () => {
    expect(() => functions.getBookById(books, 22)).toThrow()
  });
})

//2

describe('function getBookIndexById', () => {
  it('getBookIndexById 1 devuelve el libro con id 1', () => {
    const response = functions.getBookIndexById(books, 1)
    expect(response).toBe(0)
  });

  it('getBookIndexById 22 devuelve un error', () => {
    expect(() => functions.getBookIndexById(books, 22)).toThrow()
  });
})

//3

describe('function getUserById', () => {
  it('getUserById 2 devuelve el usuario con id 2', () => {
    const response = functions.getUserById(users, 2)
    expect(response.id).toBe(2)
  });

  it('getUserById 22 devuelve un error', () => {
    expect(() => functions.getUserById(users, 22)).toThrow()
  });
})

//4

describe('function getUserIndexById', () => {
  it('getUserIndexById 2 devuelve el usuario con id 2', () => {
    const response = functions.getUserIndexById(users, 2)
    expect(response).toBe(0)
  });

  it('getUserIndexById 22 devuelve un error', () => {
    expect(() => functions.getUserIndexById(users, 22)).toThrow()
  });
})

//5

describe('function getUserByNickName', () => {
  it('getUserByNickName 1 devuelve el libro con id 1', () => {
    const response = functions.getUserByNickName(users, "Ignasi")
    const user = users.find(user => user.nick === "Ignasi")
    expect(response).toEqual(user)
  });

  it('getUserByNickName 22 devuelve un error', () => {
    expect(() => functions.getUserByNickName(users, "Nehuen")).toThrow()
  });
})

//6

describe('function getModuleByCode', () => {
  it('getModuleByCode 1 devuelve el libro con id 1', () => {
    const response = functions.getModuleByCode(modules, "0011")
    const module = modules.find(module => module.code === "0011")
    expect(response).toEqual(module)
  });

  it('getModuleByCode 3467346734 devuelve un error', () => {
    expect(() => functions.getModuleByCode(modules, "3467346734")).toThrow()
  });
})

//7

describe('function booksFromUser', () => {
  it('booksFromUser 4 devuelve los libros del usuario con id 4', () => {
    const response = functions.booksFromUser(books, 4)
    expect(response.length).toBeGreaterThan(0)
  });

  it('booksFromUser 23 devuelve un array vacío', () => {
    const response = functions.booksFromUser(books, 23)
    expect(response).toEqual([])
  });
})

//8

describe('function booksFromModule', () => {
  it('booksFromModule 5021 devuelve los libros del modulo con code 5021', () => {
    const response = functions.booksFromModule(books, "5021")
    expect(response.length).toBeGreaterThan(0)
  });
  
  it('booksFromModule 23 devuelve un array vacío', () => {
    const response = functions.booksFromModule(books, "654645")
    expect(response).toEqual([])
  });
})


//9

describe('function booksCheeperThan', () => {
  it('booksCheeperThan 20 devuelve los libros que cuestan menos de 20', () => {
    const response = functions.booksCheeperThan(books, 20)
    expect(response.length).toBeGreaterThan(0)
    expect(response.every(book => book.price < 20)).toBe(true)
  });

  it('booksCheeperThan 1 devuelve un array vacío', () => {
    const response = functions.booksCheeperThan(books, 1)
    expect(response).toEqual([])
  });

})


//10

describe('function booksWithStatus', () => {
  it('booksWithStatus new devuelve los libros con estado new', () => {
    const response = functions.booksWithStatus(books, "new")
    expect(response.length).toBeGreaterThan(0)
    expect(response.every(book => book.status === "new")).toBe(true)
  });

  it('booksWithStatus estado inexistente devuelve un array vacío', () => {
    const response = functions.booksWithStatus(books, "inexistente")
    expect(response).toEqual([])
  });
})

//11

describe('function averagePriceOfBooks', () => {
  it('averagePriceOfBooks devuelve el precio medio con dos decimales y el símbolo €', () => {
    const response = functions.averagePriceOfBooks(books)
    const total = books.reduce((sum, book) => sum + book.price, 0)
    const average = (total / books.length).toFixed(2) + ' €'
    expect(response).toBe(average)
  });
})


//12

describe('function booksOfTypeNotes', () => {
  it('booksOfTypeNotes devuelve los libros que son apuntes', () => {
    const response = functions.booksOfTypeNotes(books)
    expect(response.length).toBeGreaterThan(0)
    expect(response.every(book => book.publisher === "Apunts")).toBe(true)
  });

  it('booksOfTypeNotes devuelve un array vacío si no hay apuntes', () => {
    const booksWithoutNotes = books.filter(book => book.publisher !== "Apunts")
    const response = functions.booksOfTypeNotes(booksWithoutNotes)
    expect(response).toEqual([])
  });
})

//13

describe('function bookExists', () => {
    it('bookExists devuelve true si existe un libro con ese userId y moduleCode', () => {
        const response = functions.bookExists(books, 4, "5025")
        expect(response).toBe(true)
    });

    it('bookExists devuelve false si no existe un libro con ese userId y moduleCode', () => {
        const response = functions.bookExists(books, 23, "9999")
        expect(response).toBe(false)
    });
});

//14

describe('function booksNotSold', () => {
    it('booksNotSold devuelve los libros que no se han vendido', () => {
        const response = functions.booksNotSold(books)
        expect(response.length).toBeGreaterThan(0)
        expect(response.every(book => book.soldDate === "")).toBe(true)
    });

    it('booksNotSold devuelve un array vacío si todos los libros se han vendido', () => {
        const soldBooks = books.map(book => ({ ...book,
            soldDate: "2026-09-15"
        }))
        const response = functions.booksNotSold(soldBooks)
        expect(response).toEqual([])
    });
});

//15

describe('function incrementPriceOfBooks', () => {
    it('incrementPriceOfBooks incrementa el precio de todos los libros', () => {
        const response = functions.incrementPriceOfBooks(books, 10)
        expect(response.length).toBe(books.length)
        expect(response.every((book, index) => book.price === books[index].price * 1.1)).toBe(true)
    });

    it('incrementPriceOfBooks devuelve un array vacío si no hay libros', () => {
        const response = functions.incrementPriceOfBooks([], 10)
        expect(response).toEqual([])
    });
});