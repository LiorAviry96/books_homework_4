
import { bookService } from "../services/book.service.js";
import { BookPreview } from "../cmps/BookPreview.jsx";


const { useEffect, useState } = React


export function Dashboard() {
    const [booksByCategory, setBooksByCategory] = useState(null);

    useEffect(() => {
        bookService.getBooksByCategory().then(setBooksByCategory).catch((err) => {
            console.log("Error loading books by category:", err);
        });
    }, []);

    if (!booksByCategory) return <div>Loading...</div>;

    return (
        <section className="dashboard">
          
        </section>
    );
}
