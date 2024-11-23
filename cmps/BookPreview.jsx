

export function BookPreview({ book }) {
    const { title, thumbnail, listPrice } = book;

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <img src={thumbnail} alt={`Cover of the book ${title}`} />
        </article>
    );
}
