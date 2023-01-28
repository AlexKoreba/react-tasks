import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Controls from "./Controls";
import List from "./List";

import { filterEvents } from "./../helpers/events";


const Filter = ( {arrList} ) => {

    const [wordsList, setWordsList] = useState( [...arrList] );
    const [enteredText, setEnteredText] = useState("");
    const [sortMode, setSortMode] = useState(false);


    useEffect( () => {

        const toggleSortMode = value => setSortMode(value);
        const textChanged = newText => setEnteredText(newText);
        const reset = () => {
            setWordsList([...arrList]);
            setEnteredText("");
        };

        filterEvents.addListener("ESortModeSwitched", toggleSortMode);
        filterEvents.addListener("ETextChanged", textChanged);
        filterEvents.addListener("EControlsCleared", reset);

        return () => {
            filterEvents.removeListener("ESortModeSwitched", toggleSortMode);
            filterEvents.removeListener("ETextChanged", textChanged);
            filterEvents.removeListener("EControlsCleared", reset);
        }
    }, [arrList]);


    useEffect( () => {

        let newArr = !enteredText ? [...arrList] : [...arrList].filter( text => text.includes(enteredText) );

        if (sortMode) {
            newArr.sort(); 
        }

        setWordsList(newArr);

    }, [sortMode, enteredText, arrList]);


    return ( 
        <form>
            <Controls />
            <List wordsList = {wordsList} />
        </form>
    );
}

Filter.propTypes = {
    arrList: PropTypes.arrayOf(PropTypes.string).isRequired
};
 
export default Filter;