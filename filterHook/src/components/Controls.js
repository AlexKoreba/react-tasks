import { useState } from "react";
import { filterEvents } from "./../helpers/events";

const Controls = () => {

    const [checkboxActive, setCheckboxActive] = useState(false);
    const [inputText, setInputText] = useState("");
    

    const toggleCheckbox = () => {
        filterEvents.emit("ESortModeSwitched", !checkboxActive);
        setCheckboxActive( currentValue => currentValue ? false : true);
    }

    const getEnteredText = event => {
        filterEvents.emit("ETextChanged", event.target.value);
        setInputText(event.target.value);
    }

    const resetParams = () => {
        filterEvents.emit("ESortModeSwitched", false);
        filterEvents.emit("EControlsCleared");
        setCheckboxActive(false);
        setInputText("");
    }

    return ( 
        <>
            <input className="checkbox" type="checkbox" onChange={toggleCheckbox} checked={checkboxActive}></input>
            <input className="text" type="text" onChange={getEnteredText} value={inputText}></input>
            <input className="reset" type="button" value="reset" onClick={resetParams}></input>
        </>
    );
}
 
export default Controls;