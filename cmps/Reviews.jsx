//const { useState } = React

export function Reviews({ reviews, removeReview }) {

   
    return (
        <section className="reviews-container">
         
         <div className="review-table" >
                <h2>Reviews</h2>
                {reviews ? reviews.map((review) => {
                    return (
                        <div key={review.fullName} className="review" >
                            <h2>Name: {review.fullName}</h2>
                            <p>Rate: {review.rate}</p>
                            <p>Date: {review.date}</p>
                            <button className="red" onClick={() => removeReview(review.id)} >Delete</button>

                        </div>
                    )
                }) : ''}
            </div>

        </section>
    );
}
