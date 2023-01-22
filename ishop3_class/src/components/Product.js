import React from 'react';
import PropTypes from 'prop-types';

import "./Product.css";

class Product extends React.Component {

    static propTypes = {
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

    selectionTr = () => {
        this.props.cbTrChanged(this.props.id);
    }

    removeTr = event => {
        event.stopPropagation();

        if ( window.confirm('Удалить товар?') ) {
            this.props.cbProductsListChanged(this.props.id);
        }
    }

    editTr = event => {
        event.stopPropagation();
        this.props.cbProductEdit(this.props.id);
    }


    render() {

        return (
            <tr className={ this.props.isSelected ? "product tr-active" : "product"} onClick={this.props.productNoEditingNow ? this.selectionTr : undefined}>
                <td> 
                    <img src={`img/${this.props.img}`} alt={this.props.title} />
                </td>
                <td>
                    <span className="product-title">{this.props.title}</span>
                </td>
                <td>
                    <span className="product-price">{(+this.props.price).toFixed(2)}</span>
                </td>
                <td>
                    <span className="product-amount">{this.props.amount}</span>
                </td>
                <td>
                    {
                        this.props.productNoEditingNow 
                        ?   <>
                                <button className="product-btn" onClick={this.editTr}>edit</button>
                                <button className="product-btn" onClick={this.removeTr}>delete</button>
                            </> 
                        :   <>
                                <button className="product-btn" onClick={this.editTr} disabled>edit</button>
                                <button className="product-btn" onClick={this.removeTr} disabled>delete</button>
                            </>              
                    }
                </td>
            </tr>
        )
    }
}

export default Product;