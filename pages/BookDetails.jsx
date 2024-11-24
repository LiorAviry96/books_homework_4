import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

   console.log('book details:', book)
    //console.log('params.bookId', params.bookId)
   // console.log('Books in localStorage:', JSON.parse(localStorage.getItem('bookDB')));
   
    if (!book) return <div>Details Loading...</div>
    return (
        <section className="book-details">
           <h2>Title: {book.title}</h2>
         <h4>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h4>
        <img src={book.thumbnail} alt={`Cover of the book ${book.title}`} />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
};


