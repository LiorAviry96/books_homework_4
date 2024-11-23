const BOOK_KEY = 'bookDB'
//_createCars()

export const bookService = {
    remove,
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}
