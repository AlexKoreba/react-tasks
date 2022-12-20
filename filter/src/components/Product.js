import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

import "./Product.css";

const Product = (props) => {

    const tr = useRef(null);
    const btn = useRef(null);
    
    // Выделение строки
    const [activeTr, setActiveTr] = useState(false);

    useEffect( () => {

        if (activeTr) {
            tr.current.classList.add('tr-active');
            tr.current.setAttribute('data-active', '');
        } else {
            tr.current.classList.remove('tr-active');
            tr.current.removeAttribute('data-active');
        }

    }, [activeTr]);

    const toggleActiveTr = () => {
        setActiveTr( currentValue => currentValue ? false : true);
    };

    // Удаление строки
    const removeTr = () => {   
        const question = window.confirm('Удалить товар?');

        if (question) {
            tr.current.remove();
        }
    }; 


    return ( 
        <tr className="product" onClick={toggleActiveTr} ref={tr}>
            <td>
                <img src={props.img} alt={props.title} />
            </td>
            <td>
                <span className="product-title">{props.title}</span>
            </td>
            <td>
                <span className="product-price">{props.price.toFixed(2)}</span>
            </td>
            <td>
                <span className="product-amount">{props.amount}</span>
            </td>
            <td>
                <button className="product-delete" onClick={removeTr} ref={btn}>delete</button>
            </td>
        </tr>
    );
}

Product.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
}
 
export default Product;