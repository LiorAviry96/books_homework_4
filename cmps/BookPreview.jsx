

export function BookPreview({ book }) {
    const { title,authors, thumbnail, listPrice } = book;
    //console.log('book',book)

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h3>Authors: {authors}</h3>
            <h4>Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <img src={`../assets/img/${book.thumbnail}.jpg`} alt={`Cover of the book ${title}`} />
        </article>
    );
}
