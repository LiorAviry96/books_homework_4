export function RateBySelect({ rating, handleChange }) {

    function onSetSelect(selectedValue) {
        const target = { name: 'rating', value: selectedValue };
        handleChange({ target });
    }
    return (
       <div>
               <label>
                  Rating
                </label>
                <select value={rating} onChange={(ev) => onSetSelect(ev.target.value)}>

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