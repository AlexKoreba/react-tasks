import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import "./BR2JSX.css";

const BR2JSX = (props) => {

    const [text, setText] = useState(props.text);

    useEffect( () => {
        if ( props.text.includes("<br>") || props.text.includes("<br/>") ) {
            setText( currentText => currentText.split("<br>").join("<br />") );
            setText( currentText => currentText.split("<br/>").join("<br />") );
        }

    }, [props.text])

 
    return ( 
        <div className = "container">
            {text.split("<br />").map( text => <>{text}<br /></>)}
        </div>
    );
}
 
BR2JSX.propTypes = {
    text: PropTypes.string.isRequired
};

export default BR2JSX;