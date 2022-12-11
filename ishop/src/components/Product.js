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
 
export default Product;