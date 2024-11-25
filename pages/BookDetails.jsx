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
    function isOnSale(){
        if(book.listPrice.isOnSale === true){
            return ' -ON SALE'
        }
    }
    const getReadingLevel = () => {
        if (book.pageCount > 500) return 'Serious Reading';
        if (book.pageCount > 200) return 'Descent Reading';
        if (book.pageCount < 100) return 'Light Reading';
        return ''; 
    };

    const getBookAgeCategory = () => {
        const currentYear = new Date().getFullYear();
        const bookAge = currentYear - book.publishedDate;
        if (book.bookAge > 10) return 'Vintage';
        if (book.bookAge < 1) return 'New';
        return ''; // Default case
    };
   //console.log('book details:', book)
   // console.log('params.bookId', params.bookId)
   // console.log('Books in localStorage:', JSON.parse(localStorage.getItem('bookDB')));
   
    if (!book) return <div>Details Loading...</div>

    return (
        <section className="book-details">
           <h2>Title: {book.title}</h2>
         <h4>
            <span>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</span>
         <span className="sale">
                    {isOnSale()}
                </span>
         </h4>
         <h4>Page Count: {book.pageCount}</h4>
         <h4>Publish Date: {book.publishedDate}</h4>
         <h4>Page Count: {book.pageCount}</h4>
            <h4>Reading Level: {getReadingLevel()}</h4>
            <h4>Publish Date: {book.publishedDate}</h4>
            <h4>Book Age: {getBookAgeCategory()}</h4>
        <img  src={`../assets/img/${book.thumbnail}.jpg`}alt={`Cover of the book ${book.title}`} />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
};


