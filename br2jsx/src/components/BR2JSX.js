import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import "./BR2JSX.css";

const BR2JSX = (props) => {

    const [arrText, setArrText] = useState( [] );
    const [arrMain, setArrMain] = useState( [] );

    
    useEffect( () => {

        const arrTextChanged = props.text.replace( /<br(.*?)>/gi, "<br />" ).split("<br />");

        if ( JSON.stringify(arrText) !== JSON.stringify(arrTextChanged)) {
            setArrText(arrTextChanged);
        }
        
        setArrMain( () => {

            let result = [];

            for (let i = 0; i < arrText.length; i++) {

                if (i === arrText.length - 1) {
                    result.push( arrText[i] );
                    break;
                }

                result.push( arrText[i], <br key={i} /> );
            }

            return result;
        })

    }, [props.text, arrText])


    return ( 
        <div className = "container">{arrMain}</div>
    );
}
 
BR2JSX.propTypes = {
    text: PropTypes.string.isRequired
};

export default BR2JSX;