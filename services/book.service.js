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
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            //console.log('Raw books from storage:', books);

            if (filterBy.txt && filterBy.txt.trim() !== "") {
                const regExp = new RegExp(filterBy.txt, 'i');
                books = books.filter(book => regExp.test(book.title));
             //   console.log('Books after txt filter:', books);
            }
            if(filterBy.minPrice !== 0 && filterBy.maxPrice){
                books = books.filter(book => {
                    const price = parseFloat(book.price);
                    return !isNaN(price) && price >= (filterBy.minPrice || 0) && price <= (filterBy.maxPrice || Infinity);
                });
            }
            

          //  console.log('Books after price filter:', books); // Log after applying price filter
            return books;
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
        listPrice
    };
    return book;
}
