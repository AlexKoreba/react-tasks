import PropTypes from "prop-types";

import { filterEvents } from "./../helpers/events";

const Controls = ( {checkboxActive, inputText} ) => {

    const toggleCheckbox = () => filterEvents.emit("ESortModeSwitched");
    const getEnteredText = event => filterEvents.emit("ETextChanged", event.target.value);
    const resetParams = () => filterEvents.emit("EControlsCleared");

    return ( 
        <>
            <input className="checkbox" type="checkbox" onChange={toggleCheckbox} checked={checkboxActive}></input>
            <input className="text" type="text" onChange={getEnteredText} value={inputText}></input>
            <input className="reset" type="button" value="reset" onClick={resetParams}></input>
        </>
    );
}

Controls.propTypes = {
    checkboxActive: PropTypes.bool.isRequired,
    inputText: PropTypes.string.isRequired
};
 
export default Controls;