
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate();
    const params = useParams();
    const bookId = params.bookid;


    useEffect(() => {
        if (bookId) {
            loadBook(bookId);
        }
    }, [bookId]);



    function loadBook(bookid) {
        bookService.get(bookid).then((myBook) => {
            setBook({
                ...myBook,
                authors: myBook.authors.join(', '),
                categories: myBook.categories.join(', '),
            });
            // setListPrice(myBook.listPrice);
        });
    }


    function handleChange({ target }) {
        let { value, name: field } = target;
    
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value;
                break;
            case 'checkbox':
                value = target.checked;
                break;
        }
    
        setBookToEdit((prevBook) => {
            // Handle nested listPrice fields
            if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {
                return {
                    ...prevBook,
                    listPrice: {
                        ...prevBook.listPrice,
                        [field]: value
                    }
                };
            }
    
            // Handle other fields
            return { ...prevBook, [field]: value };
        });
    }
    
    function handleArrayChange({ target }, field) {
        const value = target.value.split(",").map((str) => str.trim());
        setBookToEdit((prevBook) => ({
            ...prevBook,
            [field]: value,
        }));
    }
    
    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }


    const {
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice: {
            amount,
            currencyCode,
            isOnSale
        }
    } = bookToEdit
    

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="subtitle">Subtitle</label>
                <input onChange={handleChange} value={subtitle} type="text" name="subtitle" id="subtitle" />

                 <label htmlFor="description">Description</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />

                <label htmlFor="publishedDate">Published Date</label>
                <input onChange={handleChange} value={publishedDate} type="date" name="publishedDate" id="publishedDate" />

                <label htmlFor="amount">Price</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <label htmlFor="currencyCode">Currency Code</label>
                <input onChange={handleChange} value={currencyCode} type="text" name="currencyCode" id="currencyCode" />

                <label htmlFor="isOnSale">On Sale:</label>
                <input onChange={handleChange} checked={isOnSale} type="checkbox" name="isOnSale" id="isOnSale" />

                <label htmlFor="pageCount">Page Count</label>
                <input onChange={handleChange} value={pageCount} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="language">Language</label>
                <input onChange={handleChange} value={language} type="text" name="language" id="language" />

                <label htmlFor="categories">Categories (comma-separated)</label>
                <input
                    onChange={(event) => handleArrayChange(event, "categories")}
                    value={categories.join(", ")}
                    type="text"
                    name="categories"
                    id="categories"
                />

                <label htmlFor="authors">Authors (comma-separated)</label>
                <input
                    onChange={(event) => handleArrayChange(event, "authors")}
                    value={authors.join(", ")}
                    type="text"
                    name="authors"
                    id="authors"
                />
              <label htmlFor="thumbnail">Thumbnail URL</label>
            <input onChange={handleChange} value={thumbnail} type="text" name="thumbnail" id="thumbnail"/>

                <button>Save</button>
            </form>
        </section>
    )

}