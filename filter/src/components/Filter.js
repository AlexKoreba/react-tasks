import { useState, useEffect } from "react";

const Filter = (props) => {

    const [wordsList, setWordsList] = useState( [...props.arr] );
    const [enteredWord, setEnteredWord] = useState("");
    const [sortMode, setSortMode] = useState(false);

    useEffect( () => {

        let newArr = !enteredWord ? [...props.arr] : [...props.arr].filter( word => word.includes(enteredWord) );

        sortMode ? setWordsList(newArr.sort()) : setWordsList(newArr);

    }, [sortMode, enteredWord, props.arr]);


    const toggleSortMode = () => setSortMode( currentValue => currentValue ? false : true);
    const textChanged = event => setEnteredWord(event.target.value);

    const reset = () => {
        setWordsList( [...props.arr] );
        setEnteredWord("");
        setSortMode(false);
    }

    return ( 
        <form>
            <input className="checkbox" type="checkbox" onChange={toggleSortMode} checked={sortMode}></input>
            <input className="text" type="text" onChange={textChanged} value={enteredWord }></input>
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