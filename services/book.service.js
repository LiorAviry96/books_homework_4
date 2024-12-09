import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'


const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    remove,
    get,
    save,
    query,
    getDefaultFilter,
    getEmptyBook,
    addReview,
    removeReview,
    addGoogleBook
}

async function query(filterBy = {}) {
    let books = await storageService.query(BOOK_KEY)


    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter((book) => regExp.test(book.title))
    }


    if (filterBy.subtitle) {
        const regExp = new RegExp(filterBy.subtitle, 'i')
        books = books.filter((book) => regExp.test(book.subtitle))
    }


    if (filterBy.authors) {
        const regExp = new RegExp(filterBy.authors, 'i')
        books = books.filter((book) =>
            book.authors.some((author) => regExp.test(author))
        )
    }


    if (filterBy.description) {
        const regExp = new RegExp(filterBy.description, 'i')
        books = books.filter((book) => regExp.test(book.description))
    }


    if (filterBy.categories) {
        const regExp = new RegExp(filterBy.categories, 'i')
        books = books.filter((book) =>
            book.categories.some((category) => regExp.test(category))
        )
    }


    if (filterBy.pageCount && !isNaN(filterBy.pageCount)) {
        books = books.filter((book) => book.pageCount === +filterBy.pageCount)
    }


    if (filterBy.minPrice && !isNaN(filterBy.minPrice)) {
        books = books.filter((book) => book.listPrice.amount >= +filterBy.minPrice)
    }


    if (filterBy.maxPrice && !isNaN(filterBy.maxPrice)) {
        books = books.filter((book) => book.listPrice.amount <= +filterBy.maxPrice)
    }


    if (filterBy.isOnSale) {
        books = books.filter(
            (book) => book.listPrice.isOnSale === filterBy.isOnSale
        )
    }


    return books
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
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: false
        }
    };
}


export function addReview(bookId, review) {
    return get(bookId).then((book) => {
        if (!book.reviews) book.reviews = []; // Initialize reviews if not present
        book.reviews.push(review); // Add the new review to the reviews array
        return save(book); // Save the updated book object back to the storage
    });
}


export function addGoogleBook(googleBook){
    console.log('start adding')
    const formattedBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title || '',
        subtitle: googleBook.volumeInfo.subtitle || '',
        authors: googleBook.volumeInfo.authors || [],
        publishedDate: googleBook.volumeInfo.publishedDate || '',
        description: googleBook.volumeInfo.description || '',
        pageCount: googleBook.volumeInfo.pageCount || 0,
        categories: googleBook.volumeInfo.categories || [],
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail || '',
        language: googleBook.volumeInfo.language || '',
        listPrice: {
            amount: 0, // Default price since Google Books API doesn't provide pricing
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [], // Initialize reviews as an empty array
    };
    console.log(formattedBook)
   // Retrieve existing books
   return storageService.query(BOOK_KEY).then((books) => {
    books = books || [];
    // Check if book already exists in the database
    const isAlreadyAdded = books.some((book) => book.id === formattedBook.id);
    if (isAlreadyAdded) {
        console.log('Book already exists:', formattedBook.title);
        return Promise.reject(new Error('Book is already in the database'));
    }
    // Add the new book
    books.push(formattedBook);
    saveToStorage(BOOK_KEY, books);
    console.log('Book added successfully:', formattedBook);
    return Promise.resolve();
}).catch((err) => {
    console.error('Failed to add book:', err);
    throw err;
});
    

}

export function removeReview(bookId, reviewId) {
    return get(bookId).then((book) => {
        if (!book.reviews) return; // If no reviews, nothing to remove
        book.reviews = book.reviews.filter((review) => review.id !== reviewId); // Remove the review
        return save(book); // Save the updated book
    });
}


function _createBooks() {
    let books = loadFromStorage(BOOK_KEY);
    if (!books || !books.length) {
        books = [
            _createBook(
                "metus hendrerit",
                "mi est eros convallis auctor arcu dapibus himenaeos",
                ["Barbara Cartland"],
                1999,
                "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                713,
                ["Computers", "Hack"],
                "1",
                "en",
                { amount: 109, currencyCode: "EUR", isOnSale: false }
            ),
            _createBook(
                "morbi",
                "lorem euismod dictumst inceptos mi",
                ["Barbara Cartland"],
                1978,
                "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
                129,
                ["Computers", "Hack"],
                "2",
                "sp",
                { amount: 44, currencyCode: "EUR", isOnSale: true }
            ),
            _createBook(
                "at viverra venenatis",
                "gravida libero facilisis rhoncus urna etiam",
                ["Barbara Cartland"],
                2000,
                "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
                145,
                ["Computers", "Hack"],
                "3",
                "sp",
                { amount: 404, currencyCode: "ILS", isOnSale: true }
            ),
            _createBook(
                "tristique",
                "gravida libero facilisis rhoncus urna etiam",
                ["Dr. Seuss"],
                2002,
                "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
                253,
                ["Computers", "Hack"],
                "4",
                "he",
                { amount: 174, currencyCode: "ILS", isOnSale: false }
            ),
        ];
        saveToStorage(BOOK_KEY, books);
    }
}

function _createBook(title, subtitle, authors, publishedDate, description, pageCount, categorie, thumbnail, language, listPrice) {
    const book = {
        id: makeId(),
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categorie,
        thumbnail,
        language,
        listPrice,
        reviews: [],
    };
    return book;
}
