import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import "./BR2JSX.css";

const BR2JSX = props => {

    const [arrMain, setArrMain] = useState( [] );

    
    useEffect( () => {

        const arrTextChanged = props.text.split(/<br\s*\/?>/gi);

        const result = [];

        for (let i = 0; i < arrTextChanged.length; i++) {

            if (i) 
                result.push( <br key={i} /> ); /* Добавляем <br /> перед каждым элементом, кроме первого */

            result.push( arrTextChanged[i] );
        }

        setArrMain(result);

    }, [props.text])


    return ( 
        <div className = "container">
            {arrMain}
        </div>
    );
}
 
BR2JSX.propTypes = {
    text: PropTypes.string.isRequired
};

export default BR2JSX;