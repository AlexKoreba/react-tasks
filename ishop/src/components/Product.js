import PropTypes from 'prop-types';

import "./Product.css";

const Product = (props) => {

    return ( 
        <tr className="product">
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