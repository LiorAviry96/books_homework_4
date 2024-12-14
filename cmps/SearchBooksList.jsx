export function SearchBooksList({ booksList, handleAddGoogleBook }) {
    return (
        <ul className="search-results">
        {booksList.map((book) => (
      <li key={book.id} className="search-result-item">
       <div className="book-info">
      <span className="book-title">{book.title}</span>
      <i className="fas fa-plus-square" onClick={() => handleAddGoogleBook(book)} style={{ paddingLeft: '10px', cursor:"pointer" }}></i>
       </div>
      

  </li>
))}
</ul>
    )
}