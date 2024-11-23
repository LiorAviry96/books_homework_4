
import { bookService } from "../services/book.service.js"
const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

if (!books) return <div>Loading...</div>

    return (
        <section className="car-index">
          
            <CarList
                books={books}
                onRemoveCar={onRemoveBook}
            />
        </section>
    )
}