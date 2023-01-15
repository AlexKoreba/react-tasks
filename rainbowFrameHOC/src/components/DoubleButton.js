import PropTypes from 'prop-types';

import "./DoubleButton.css";

const DoubleButton = props => {

    const pressedBtn = event => props.cbPressed( event.target.value === props.caption1 ? 1 : 2 );

    return ( 
        <>
            <input type="button" value={props.caption1} onClick={pressedBtn}></input>
            {props.children}
            <input type="button" value={props.caption2} onClick={pressedBtn}></input>
        </>
    );
}

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired
}
 
export default DoubleButton;