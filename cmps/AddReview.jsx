import { RateBySelect } from './dynamic-inputs/RateBySelect.jsx'
import { RateByStars } from './dynamic-inputs/RateByStars.jsx'
import { RateByTextbox } from './dynamic-inputs/RateByTextbox.jsx'
import { bookService } from '../services/book.service.js'
import { NumberInputRating } from './dynamic-inputs/NumberInputRating.jsx'
const { useState, useRef, useEffect } = React

export function AddReview({addReview}) {
    const inputRef = useRef()

    const [review, setReview] = useState(bookService.getEmptyReview());
    const [cmpType, setCmpType] = useState('stars')
    const { fullName, date, txt, rating } = review

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    function handleChange({ target }) {
        const { value, name: field } = target;
        setReview(prevReview => ({ ...prevReview, [field]: value }));
    }
    
    function submitReview(ev) {
        ev.preventDefault();
        //console.log('review', review);
        addReview(review); // Pass only the review object
    }

    return (
        <section className="add-review-container">
            <h1 className="add-review-header">Add a Review</h1>
            <form onSubmit={submitReview}>
                <div>
                <label  htmlFor="fullName">
                    Full Name
                </label>
                <input
                 type="text"
                 id='fullname'
                  name="fullName"
                  ref={inputRef}
                  value={fullName}
                 onChange={handleChange}
                />
                   <label htmlFor='date'>Date:</label>
                <input
                    type='date'
                    id='date'
                    name='date'
                    value={date}
                    onChange={handleChange}  />
                
                <div>
                        <p>Select rating type:</p>
                        <input name='rating'
                            onChange={(ev) => setCmpType(ev.target.value)}
                            id='select'
                            defaultChecked={cmpType === 'select'}
                            type="radio"
                            value='select' />
                        <label htmlFor="select">Select</label>
                        <input name='rating'
                            onChange={(ev) => setCmpType(ev.target.value)}
                            id='stars'
                            type="radio"
                            defaultChecked={cmpType === 'stars'}
                            value='stars' />
                        <label htmlFor="stars">Stars</label>
                        <input name='rating'
                            onChange={(ev) => setCmpType(ev.target.value)}
                            id='number'
                            type="radio"
                            defaultChecked={cmpType === 'number'}
                            value='number' />
                        <label htmlFor="number">Number</label>
                    </div>
                 <DynamicCmp  type={cmpType} handleChange={handleChange} rating={rating}/>
                 <RateByTextbox handleChange={handleChange} txt={txt} />

             
                    <button>Submit</button>
                    </div>
            </form>

        </section>
    );
}


function DynamicCmp({ type, ...restOfProps }) {
    switch (type) {
        case 'select':
            return <RateBySelect {...restOfProps} />
        case 'number':
            return <NumberInputRating {...restOfProps} />
        case 'stars':
            return <RateByStars {...restOfProps} />
    }

    return null

}






