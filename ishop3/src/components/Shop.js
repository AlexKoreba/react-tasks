import { useState } from "react";
import PropTypes from 'prop-types';

import Product from "./Product";
import products from './../helpers/productsList.json';
import "./Shop.css";


const Shop = (props) => {

    const [selectedTr, setSelectedTr] = useState(null);
    const [productsList, setProductsList] = useState( [...products] );

    const trChanged = trID => setSelectedTr(trID);
    const productsListChanged = trID => setProductsList( currentValue => [...currentValue].filter( product => product.id !== trID ));


    return ( 
        <div className="container"> 
            <h1>Товары магазина &laquo;{props.shopName}&raquo;</h1>

            <table border={1}>

                <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Наименование</th>
                        <th>Цена</th>
                        
                        <th>Количество</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                
                <tbody>
                    {productsList.map( product => {
                        return <Product 
                            key={product.id} 
                            id={product.id} 
                            img={product.img} 
                            title={product.title} 
                            price={product.price} 
                            amount={product.amount} 
                            cbTrChanged={trChanged}
                            isSelected={selectedTr === product.id}
                            cbProductsListChanged={productsListChanged} 
                            />
                    })}
                </tbody>

            </table>
        </div>
    );
};

Shop.propTypes = {
    shopName: PropTypes.string.isRequired
};
 
export default Shop;