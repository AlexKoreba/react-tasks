import PropTypes from 'prop-types';

import "./Product.css";

const Product = (props) => {
    
    // Функция передачи информации о выбранной строке родителю:
    const selectionTr = () => props.cbTrChanged(props.id);

    // Функция передачи информации о удаляемой строке родителю:
    const removeTr = event => {   
        event.stopPropagation();

        if ( window.confirm('Удалить товар?') ) {
            props.cbProductsListChanged(props.id);
        }
    }; 


    return ( 
        <tr className={ props.isSelected ? "product tr-active" : "product"} onClick={selectionTr} data-id={props.id}>
            <td> 
                <img src={`img/${props.img}`} alt={props.title} />
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
                <button className="product-btn">edit</button>
                <button className="product-btn" onClick={removeTr}>delete</button>
            </td>
        </tr>
    );
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    cbTrChanged: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    cbProductsListChanged: PropTypes.func.isRequired
}
 
export default Product;