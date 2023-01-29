import PropTypes from "prop-types";

import { filterEvents } from "./../helpers/events";

const Controls = ( {checkboxActive, inputText} ) => {

    return ( 
        <>
            <input className="checkbox" type="checkbox" onChange={ () => filterEvents.emit("ESortModeSwitched") } checked={checkboxActive}></input>
            <input className="text" type="text" onChange={ event => filterEvents.emit("ETextChanged", event.target.value) } value={inputText}></input>
            <input className="reset" type="button" value="reset" onClick={ () => filterEvents.emit("EControlsCleared") }></input>
        </>
    );
}

Controls.propTypes = {
    checkboxActive: PropTypes.bool.isRequired,
    inputText: PropTypes.string.isRequired
};
 
export default Controls;