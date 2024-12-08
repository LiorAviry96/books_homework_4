
const { useState, useEffect } = React
import { debounce } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";

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
                console.error('Failed to add book:', err);
                alert('Failed to add book. Please try again.');
         });
            }
      
    return (
        <div>
          <h1>Add Books</h1>
          <input
            type="text"
            placeholder="Search for books"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {error && <p className="error">{error}</p>}
          <ul>
            {searchResults.map((book) => (
                
              <li key={book.id}>
                <span>{book.volumeInfo.title}</span>
                <button onClick={() => handleAddBook(book)}>+</button>
              </li>
            ))}
          </ul>
        </div>
      );
}