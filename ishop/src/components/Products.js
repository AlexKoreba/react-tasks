import PropTypes from 'prop-types';

import "./Products.css";

import Product from "./Product";
import { products } from "../helpers/productsList";

const Products = (props) => {
    return ( 
        <div className="container">
            <h1>Товары магазина &laquo;{props.shopName}&raquo;</h1>

            <table border={1}>
                <tr>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Количество</th>
                </tr>

                    {products.map( product => {
                        return <Product key={product.id} img={product.img} title={product.title} price={product.price} amount={product.amount} />
                    })}

            </table>
        </div>
    );
};

Products.propTypes = {
    shopName: PropTypes.string.isRequired
};
 
export default Products;