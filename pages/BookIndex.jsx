
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { AddBook } from "../cmps/AddBook.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from "../services/util.service.js"
const { Link, useSearchParams} = ReactRouterDOM

const { useEffect, useState } = React

export function BookIndex() {

 const [books, setBooks] = useState(null)
 const [searchParams, setSearchParams] = useSearchParams()

 const [filterBy, setFilterBy] = useState(bookService.getFilterFromSrcParams(searchParams))

 useEffect(() => {
    setSearchParams(getTruthyValues(filterBy))
    loadBooks();
}, [filterBy]);


function loadBooks() {
    //console.log('Filter criteria:', filterBy);  // Log filterBy to ensure it's correct
    bookService.query(filterBy)
        .then(books => {
        //    console.log('Loaded books:', books);
            setBooks(books);
            showSuccessMsg('Books loaded successfully!')
        })
        .catch(err => {
            console.log('Problems getting books:', err);
        });
}


function onSetFilter(filterBy) {
     //console.log('filterBy:', filterBy)
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
}

function onAddBook(newBook) {
    setBooks((prevBooks) => [...prevBooks, newBook]);
}

function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg('Problems removing book')
            })
    }

if (!books) return <div>Loading...</div>
//console.log(books)
    return (
        <section className="book-index">
            <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
            <section className="add-button">
                <Link className="button-add" to="/book/edit">Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
            <AddBook onAddBook={onAddBook}/>
        </section>
    )
}