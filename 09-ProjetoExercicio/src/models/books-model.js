const HttpError = require('../errors/HttpError');

const uuid = require('uuid').v4;

let books = [
    { id: '1', title: 'Book 1', author: 'Author 1', quantityAvailable: 4 },
    { id: '2', title: 'Book 2', author: 'Author 2', quantityAvailable: 3 },
    { id: '3', title: 'Book 3', author: 'Author 3', quantityAvailable: 5 },
    { id: '4', title: 'Book 4', author: 'Author 4', quantityAvailable: 3 },
]

module.exports = {
    getAllBooks () {
        return books;
    },
    getBookById(id){
        return books.find(book => book.id === id);
    },
    createBook(title, author, quantityAvailable){
        const newBook = { id: uuid(), title, author, quantityAvailable };

        books.push(newBook);
        return newBook;
    },
    updateBook(id, updateBook){
        const bookIndex = books.findIndex(book => book.id === id);

        if(bookIndex === -1){
            throw new HttpError('Livro não encontrado', 404);
        }

        books[bookIndex] = {...books[bookIndex], ...updateBook};
        return books[bookIndex];
    },
    deleteBook(id){
        const bookIndex = books.findIndex(book => book.id === id);

        if(bookIndex === -1){
            throw new HttpError('Livro não encontrado', 404);
        }
        const deletedBook = books[bookIndex];
        books.splice(bookIndex, 1);
        return deletedBook;
    }
}