
export function BookPreview({ book }) {
    const { title, authors, pageCount, publishedDate, thumbnail, listPrice } = book;
    function isOnSale(){
        if(listPrice.isOnSale === true){
            return ' -ON SALE'
        }
    }
  
 
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h3>Authors: {authors.join(', ')}</h3>
            <h4>Price: 
            <span className={listPrice.amount > 150 ? 'price-high' : '' || listPrice.amount < 20 ? 'price-low' : ''} >
                    {listPrice.amount} {listPrice.currencyCode}
                </span> 
                <span className="sale">
                    {isOnSale()}
                </span>
            </h4>
            <h4>Page Count: {pageCount}</h4>
          
            <img src={`../assets/img/${thumbnail}.jpg`} alt={`Cover of the book ${title}`} />
        </article>
    );
}
