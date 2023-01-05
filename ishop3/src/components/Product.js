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
    
    // Функция передачи информации о строке, выбранной для редактирования:
    const editTr = event => {
        event.stopPropagation();
        props.cbProductEdit(props.id);
    }


    return ( 
        <tr className={ props.isSelected ? "product tr-active" : "product"} onClick={props.productNoEditingNow ? selectionTr : undefined}>
            <td> 
                <img src={`img/${props.img}`} alt={props.title} />
            </td>
            <td>
                <span className="product-title">{props.title}</span>
            </td>
            <td>
                <span className="product-price">{(+props.price).toFixed(2)}</span>
            </td>
            <td>
                <span className="product-amount">{props.amount}</span>
            </td>
            <td>
                {
                    props.productNoEditingNow 
                    ?   <>
                            <button className="product-btn" onClick={editTr}>edit</button>
                            <button className="product-btn" onClick={removeTr}>delete</button>
                        </> 
                    :   <>
                            <button className="product-btn" onClick={editTr} disabled>edit</button>
                            <button className="product-btn" onClick={removeTr} disabled>delete</button>
                        </>              
                }
            </td>
        </tr>
    );
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    cbTrChanged: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    cbProductsListChanged: PropTypes.func.isRequired,
    cbProductEdit: PropTypes.func.isRequired,
    productNoEditingNow: PropTypes.bool.isRequired
}
 
export default Product;