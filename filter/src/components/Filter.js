import { useState, useEffect, useRef } from "react";

const Filter = (props) => {

    const form = useRef(null);
    const input = useRef(null);
    const checkbox = useRef(null);
    const btn = useRef(null);
    const div = useRef(null);

    let array = useRef( [...props.arr] );

    let reset = useRef(null);
    reset = () => {
        if (checkbox.current.hasAttribute('checked')) {
            checkbox.current.removeAttribute('checked');
            array.current = [...props.arr];
        } 

    }

    const [sortMode, setSortMode] = useState(false);

    useEffect( () => {

        if (sortMode) {
            checkbox.current.setAttribute('checked', '');
            array.current = [...props.arr];

        } else {
            checkbox.current.removeAttribute('checked');
            array.current = [...props.arr].sort();
        }


    }, [sortMode, props.arr, reset]);


    const toggleSortMode = () => {
        setSortMode( currentValue => currentValue ? false : true);
    };


    return ( 
        <form ref={form}>
            <input className="checkbox" type="checkbox" onChange={toggleSortMode} ref={checkbox}></input>
            <input className="text" type="text" ref={input}></input>
            <input className="reset" type="reset" value="reset" onClick={reset} ref={btn}></input>

            <div className="content" ref={div}>
                <ul>

                    {
                        array.current.map( word => {
                            return (<li key={word}>{word}</li>)    
                        })
                    }


                </ul>
            </div>

        </form>
    );
}
 
export default Filter;