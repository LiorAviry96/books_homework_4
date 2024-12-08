const { useState } = React


export function LongTxt({ children, txt, length = 100 }) {
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)


    function onToggleIsShowLong() {
        setIsShowFullTxt(isShowLong => !isShowLong)
    }


    const isTextOverflow = txt.length > length
    const textToShow = (isShowFullTxt || !isTextOverflow) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt">{textToShow}</p>
            {isTextOverflow &&
                <div>
                    <button className="show-txt-btn" onClick={onToggleIsShowLong}>
                        {isShowFullTxt ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            }
        </section>
    );
}
