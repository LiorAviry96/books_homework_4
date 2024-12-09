
const { useState, useEffect } = React
import { debounce } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";
import '@fortawesome/fontawesome-free/css/all.css';

export function AddBook({onAddBook}){

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
      // Debounce search term handling
      const debouncedSearch = debounce((term) => {
        if (!term) {
          setSearchResults([]);
          return;
        }
        fetchBooks(term);
      }, 500);
  
      debouncedSearch(searchTerm);
    }, [searchTerm]);

  async function fetchBooks(query) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?printType=books&q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setSearchResults(data.items || []);
    } catch (err) {
        setError('Failed to fetch books. Please try again.');
        console.error(err);
    }
}


    
    function handleInputChange(event) {
        setSearchTerm(event.target.value);
      }

      function handleAddBook(googleBook) {
        bookService
            .addGoogleBook(googleBook)
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
       }
      
    return (
        <div className="add-books-google">
          <h1 className="add-book-header">Add Books from Google</h1>
          <input
            type="text"
            placeholder="Search for books"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {error && <p className="error">{error}</p>}
          <ul className="search-results">
       {searchResults.map((book) => (
        <li key={book.id} className="search-result-item">
         <div className="book-info">
        <span className="book-title">{book.volumeInfo.title}</span>
        <i className="fas fa-plus-square" onClick={() => handleAddBook(book)} style={{ paddingLeft: '10px', cursor:"pointer" }}></i>
         </div>
        

    </li>
  ))}
</ul>

        </div>
      );
}

