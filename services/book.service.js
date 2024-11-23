import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'


const BOOK_KEY = 'bookDB'
//_createCars()

export const bookService = {
    remove,
    get,
    save,
    query,
    getDefaultFilter,
    getEmptyBook,
}
function query(filterBy = {}) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            // Filter by name (title)
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i');
                cars = cars.filter(car => regExp.test(car.title)); // Changed 'vendor' to 'title'
            }
            // Filter by price (listPrice.amount)
            if (filterBy.minPrice) {
                cars = cars.filter(car => car.listPrice.amount >= filterBy.minPrice);
            }
            if (filterBy.maxPrice) {
                cars = cars.filter(car => car.listPrice.amount <= filterBy.maxPrice);
            }
            return cars;
        });
}


function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
function getDefaultFilter() {
    return { 
        txt: '', // For filtering by title or subtitle
        minPrice: 0, // For filtering books by minimum price
        maxPrice: Infinity // For filtering books by maximum price
    };
}


function getEmptyBook() {
    return {
        id: '', 
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: null,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: false
        }
    };
}

function _createBook(idx) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${idx + 1}.jpg`,
        language: 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7
        }
    };
}

function _createBooks() {
    const books = [];
    const numBooks = 20; // Number of books to create
    for (let i = 0; i < numBooks; i++) {
        books.push(_createBook(i));
    }
    storageService.save('BOOKS_DB', books); // Save books to local storage
    return books;
}
