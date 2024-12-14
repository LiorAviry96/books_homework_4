
import { debounce } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";
import { showErrorMsg , showSuccessMsg} from "../services//event-bus.service.js";
import { SearchBooksList } from "./SearchBooksList.jsx";
import '@fortawesome/fontawesome-free/css/all.css';


const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function AddBook(){

  const [booksList, setBooksList] = useState()

  const navigate = useNavigate()
  const handleSearchDebounce = useRef(debounce(handleSearch, 2000)).current


    
    function handleSearch({ target }) {

      bookService.searchGoogleBook(target.value)
            .then(res => setBooksList(res))
            .catch(() => showErrorMsg('Cannot get google books'))

      }

      /*function handleAddBook(googleBook) {
        bookService
            .saveGoogleBook(googleBook)
            .then(() => {
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
                        amount: 0,
                        currencyCode: 'USD',
                        isOnSale: false,
                    },
                    reviews: [],
                };
                // Notify `BookIndex` about the new book
                onAddBook(formattedBook);
                alert(`Book "${googleBook.volumeInfo.title}" added successfully!`);
            })
            .catch((err) => {
              if (err.message === 'Book is already in the database') {
                  alert(`Book "${googleBook.volumeInfo.title}" is already in your collection.`);
              } else {
                  console.error('Failed to add book:', err);
                  alert('Failed to add book. Please try again.');
              }
          });
       }*/

        function handleAddGoogleBook(book) {
          console.log(book)
          console.log('start saving')
            bookService.saveGoogleBook(book)
                .then(() => showSuccessMsg('Book has successfully saved!'))
                .catch(() => showErrorMsg(`couldn't save book`))
                .finally(() => navigate('/book'))
        }
      
    return (
        <div className="add-books-google">
          <form>
          <h1 className="add-book-header">Add Books from Google</h1>
          <input
            type="text"
            placeholder="Search for books"
            name='title'
            onChange={handleSearchDebounce}
          />
          </form>
        
          {booksList && <SearchBooksList booksList={booksList} handleAddGoogleBook={handleAddGoogleBook} />}


        </div>
      );
}

