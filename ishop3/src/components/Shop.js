import { useState } from "react";
import PropTypes from 'prop-types';

import Product from "./Product";
import products from './../helpers/productsList.json';
import "./Shop.css";


const Shop = (props) => {

    const [selectedTr, setSelectedTr] = useState(null);
    const [productsList, setProductsList] = useState( [...products] );

    const trChanged = trID => setSelectedTr( productsList.find( product => product.id === trID ));

    const productsListChanged = trID => {
        setProductsList( currentValue => [...currentValue].filter( product => product.id !== trID ));

        if ( trID === selectedTr.id ) {
            setSelectedTr(null);
        } 
    };


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
                            isSelected={product === selectedTr}
                            cbProductsListChanged={productsListChanged} 
                            />
                    })}
                </tbody>

            </table>

            <div className={selectedTr ? "product-card" : "none"}>
                <h2 className="product-title">{selectedTr?.title}</h2>
                <p className="product-price">Price: {selectedTr?.price.toFixed(2)}</p>
                <p className="product-amount">Amount: {selectedTr?.amount}</p>
            </div>
        </div>
    );
};

Shop.propTypes = {
    shopName: PropTypes.string.isRequired
};
 
export default Shop;