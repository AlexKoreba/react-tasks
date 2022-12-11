import { products } from "./../productsList.js";
import { Product } from "./Product.js";

export let Products = React.createClass({

    displayName: 'Products',

    propTypes: {
        shopName: React.PropTypes.string.isRequired
    },
  
    render: function(props){
  
        return React.DOM.div( 
            {className:'container'}, 

            React.DOM.h1( null, `Товары магазина "${this.props.shopName}"`),

            React.DOM.table( null, 

                React.DOM.tr( null, 
                    React.DOM.th( null, 'Изображение'),
                    React.DOM.th( null, 'Наименование'),
                    React.DOM.th( null, 'Цена'),
                    React.DOM.th( null, 'Количество'),
                ),

                products.map( product => {
                    return React.createElement(Product, {key: product.id, img: product.img, title: product.title, price: product.price, amount: product.amount})
                })
            ),
       );
    }
}); 