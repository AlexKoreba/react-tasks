import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import "./BR2JSX.css";

const BR2JSX = (props) => {

    const [text, setText] = useState(props.text);
    const [arrText, setArrText] = useState( [props.text.split(" ")] );
    const [arrMain, setArrMain] = useState( [] );

    
    useEffect( () => {

        if ( props.text.includes("<br>") || props.text.includes("<br/>") ) {
            setText( currentText => currentText.split("<br>").join("<br />") );
            setText( currentText => currentText.split("<br/>").join("<br />") );
        }

        setArrText( text.split("<br />") );

    }, [props.text, text])


    useEffect( () => {

            setArrMain( () => {

                let result = [];

                for (let i = 0; i < arrText.length; i++) {

                    if (i === arrText.length - 1) {
                        result = result.concat( arrText[i] );
                        break
                    }

                    result = result.concat( arrText[i] ).concat( <br key={i} /> );
                }

                return result;
            })

    }, [arrText])

 

    return ( 
        <div className = "container">{arrMain}</div>
    );
}
 
BR2JSX.propTypes = {
    text: PropTypes.string.isRequired
};

export default BR2JSX;