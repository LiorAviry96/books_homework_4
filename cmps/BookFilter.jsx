
import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter={} , onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

    useEffect(() => {
       // console.log(filterByToEdit)
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, minPrice , maxPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
            <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={filterByToEdit.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Subtitle:</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={filterByToEdit.subtitle || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Authors:</label>
                    <input
                        type="text"
                        name="authors"
                        value={filterByToEdit.authors || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={filterByToEdit.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Categories:</label>
                    <input
                        type="text"
                        name="categories"
                        value={filterByToEdit.categories || ''}
                        onChange={handleChange}
                    />
                </div>
 
                <div>
                    <label>Min Price:</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filterByToEdit.minPrice || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Max Price:</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filterByToEdit.maxPrice || ''}
                        onChange={handleChange}
                    />
                </div>
         
                <div>
                </div>

                <button>Submit</button>
            </form>
        </section>
    )
}