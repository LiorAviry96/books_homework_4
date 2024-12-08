const { useState } = React

export function AddReview({addReview, bookId}) {
    const [review, setReview] = useState({ fullName: '', rate: '',date: '', bookId });


    function handleChange({ target }) {
        const { name, value } = target;
        setReview(prevReview => ({ ...prevReview, [name]: value }));
    }
    
    function submitReview(ev) {
        ev.preventDefault();
        console.log('review', review);
        addReview(review); // Pass only the review object
    }
    
    return (
        <section className="add-review-container">
            <h1 className="add-review-header">Add a Review</h1>
            <form onSubmit={submitReview}>
                <label>
                    Full Name
                </label>
                <input
                 type="text"
                  name="fullName"
                  value={review.fullName}
                 onChange={handleChange}
                />
                
                <label>
                    Rating
                </label>
                <select
                    name="rate"
                    value={review.rate}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                 </select>

                
                <label>
                    Read At:
                </label>
                <input
                   type="date"
                  name="date"
                  value={review.date}
                  onChange={handleChange}
                />
                    <button>Submit</button>
            </form>

        </section>
    );
}
