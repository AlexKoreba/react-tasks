import { useRef } from "react";
import PropTypes from 'prop-types';

import "./Product.css";

const Product = (props) => {

    const tr = useRef(null);
    
    // Функция передачи информации о выбранной строке родителю:
    const selectionTr = (event) => {

        if (event.target.className !== "product-delete" ) {
            props.cbTrChanged(props.title);
        } 
    }

    // Функция удаления строки:
    const removeTr = () => {   
        const question = window.confirm('Удалить товар?');

        if (question) {
            tr.current.remove();
        }
    }; 


    return ( 
        <tr className={ props.isSelected ? "product tr-active" : "product"} onClick={selectionTr} ref={tr}>
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
                <button className="product-delete" onClick={removeTr}>delete</button>
            </td>
        </tr>
    );
}

Product.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    cbTrChanged: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
}
 
export default Product;