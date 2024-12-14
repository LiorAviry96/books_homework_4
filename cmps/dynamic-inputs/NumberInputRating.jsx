

export function NumberInputRating({ handleChange, rating }) {

    function onSetRating(value) {
        const target = { name: 'rating', value: +value };
        handleChange({ target });

    }
    return (
        <input
            name='number'
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(ev) => onSetRating(ev.target.value)}
        />
    )
}