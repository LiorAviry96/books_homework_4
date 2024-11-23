
export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Title: {book.vendor}</h2>
            <h4>Book Price</h4>
            <img src={`../assets/img/${book.thumbnail}.png`} alt="book-image" />
        </article>
    )
}