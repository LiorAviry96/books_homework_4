
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { Link } = ReactRouterDOM

const { useEffect, useState } = React

export function BookIndex() {

 const [books, setBooks] = useState(null)
 const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

 useEffect(() => {
    //console.log('Effect triggered with filterBy:', filterBy);
    loadBooks();
}, [filterBy]);


function loadBooks() {
    //console.log('Filter criteria:', filterBy);  // Log filterBy to ensure it's correct
    bookService.query(filterBy)
        .then(books => {
        //    console.log('Loaded books:', books);
            setBooks(books);
        })
        .catch(err => {
            console.log('Problems getting books:', err);
        });
}


function onSetFilter(filterBy) {
     //console.log('filterBy:', filterBy)
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
}


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
//console.log(books)
    return (
        <section className="book-index">
            <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
            <section>
                <Link className="button-add" to="/book/edit">Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}