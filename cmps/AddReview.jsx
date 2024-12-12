const { useState } = React

export function AddReview({addReview, bookId}) {
    const [review, setReview] = useState({ fullName: '', rate: '',date: '', bookId });
    const [cmpType, setCmpType] = useState('RateBySelect')

    function handleChange({ target }) {
        const { name, value } = target;
        setReview(prevReview => ({ ...prevReview, [name]: value }));
    }
    
    function submitReview(ev) {
        ev.preventDefault();
        console.log('review', review);
        addReview(review); // Pass only the review object
    }
    function handleGreetClick(value) {
        console.log(`${value} \nClicked!`)
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
                 <DynamicCmp  cmpType={cmpType}
                    review={review}
                    setReview={setReview}
                    handleChange={handleChange} // Pass this explicitly
                    handleClick={handleGreetClick}/>

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


function DynamicCmp({ cmpType, ...restOfProps }) {
    switch (cmpType) {
        case 'RateBySelect':
            return <RateBySelect {...restOfProps} />
        case 'RateByTextbox':
            return <RateByTextbox {...restOfProps} />
        case 'RateByStars':
            return <RateByStars {...restOfProps} />
    }

    return null

}

//* About Dynamic Cmps
function RateBySelect({ review, handleChange }) {
    
    return (
       <div>
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
       </div>
    )
}

function RateByTextbox({ review, handleChange }) {
    return (
        <div>
        <label>
             Rating
            </label>
               <input
            type="number"
            name="rate"
            value={review.rate}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Enter rating (1-5)"
        />
      </div>
    )
}

function RateByStars({ review, setReview }) {
    return (
     <div>
     <label>
      Rating
     </label>
    <div className="star-rating">
    {[1, 2, 3, 4, 5].map(star => (
        <span
            key={star}
            className={`star ${star <= review.rate ? 'filled' : ''}`}
            onClick={() => setReview(prevReview => ({ ...prevReview, rate: star }))}
            style={{ cursor: 'pointer', fontSize: '24px' }}
        >
            ★
        </span>
    ))}
    </div>
    </div>
    )
}
