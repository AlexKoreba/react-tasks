import { useState, useEffect } from "react";

const Filter = (props) => {

    const [wordsList, setWordsList] = useState( [...props.arr] );
    const [enteredText, setEnteredText] = useState("");
    const [sortMode, setSortMode] = useState(false);

    useEffect( () => {

        let newArr = !enteredText ? [...props.arr] : [...props.arr].filter( text => text.includes(enteredText) );

        if (sortMode) {
            newArr.sort(); 
        }
        setWordsList(newArr);

    }, [sortMode, enteredText, props.arr]);


    const toggleSortMode = () => setSortMode( currentValue => currentValue ? false : true);
    const textChanged = event => setEnteredText(event.target.value);

    const reset = () => {
        setWordsList( [...props.arr] );
        setEnteredText("");
        setSortMode(false);
    }

    return ( 
        <form>
            <input className="checkbox" type="checkbox" onChange={toggleSortMode} checked={sortMode}></input>
            <input className="text" type="text" onChange={textChanged} value={enteredText }></input>
            <input className="reset" type="button" value="reset" onClick={reset}></input>

            <div className="content">
                <ul>

                    {
                        wordsList.map( word => {
                            return (<li key={word}>{word}</li>)    
                        })
                    }


                </ul>
            </div>

        </form>
    );
}
 
export default Filter;