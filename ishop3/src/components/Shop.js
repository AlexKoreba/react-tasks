import { useState } from "react";
import PropTypes from 'prop-types';

import Product from "./Product";
import products from './../helpers/productsList.json';
import "./Shop.css";


const Shop = (props) => {

    const [selectedTr, setSelectedTr] = useState(null);
    const [productsList, setProductsList] = useState( [...products] );

    // Состояния карточки товара 
    const [productCardMode, setProductCardMode] = useState(null); /* Режим отображения карточки товара */
    const [editableTr, setEditableTr] = useState(null); /* Объект, в который записыватся текущие значения из инпутов */
    const [noUpdates, setNoUpdates] = useState(true); /* Не редактируется ли товар */

    const trChanged = trID => {
        setSelectedTr( productsList.find( product => product.id === trID ));
        setProductCardMode(1);
    };

    const productsListChanged = trID => {
        setProductsList( currentValue => [...currentValue].filter( product => product.id !== trID ));

        if ( trID === selectedTr.id ) {
            setSelectedTr(null);
            setProductCardMode(null);
        } 
    };

    const productEdit = trID => {
        setProductCardMode(2);
        setSelectedTr( productsList.find( product => product.id === trID ));
        setEditableTr( {...productsList.find( product => product.id === trID )});
    };

    /* Карточка товара */
    const saveProductChanges = () => {
        selectedTr.title = document.querySelector('#inputTitle').value;
        selectedTr.price = +document.querySelector('#inputPrice').value;
        selectedTr.amount = +document.querySelector('#inputAmount').value;
        selectedTr.img = document.querySelector('#inputIMG').value;
        setNoUpdates(true);
        setProductCardMode(1);
    };

    const cancelProductChanges = () => {
        setNoUpdates(true);
        setProductCardMode(1);
    }

    const updateProperties = () => {
        editableTr.id = +document.querySelector('#inputID').value;
        editableTr.title = document.querySelector('#inputTitle').value;
        editableTr.price = +document.querySelector('#inputPrice').value;
        editableTr.amount = +document.querySelector('#inputAmount').value;
        editableTr.img = document.querySelector('#inputIMG').value;

        setNoUpdates( JSON.stringify(selectedTr) === JSON.stringify(editableTr) );
    };

    // Режимы отображения карточки товара:
    const FirstMode = () => {
        return (
            <div className={productCardMode ? "product-card" : "none"}>
                <h2 className="product-title">{selectedTr.title}</h2>
                <p className="product-price">Price: {selectedTr.price.toFixed(2)}</p>
                <p className="product-amount">Amount: {selectedTr.amount}</p>
            </div>
        )
    }

    const SecondMode = () => {
        return (
            <div className={productCardMode ? "product-card" : "none"} onChange={updateProperties}>

                <div>
                    <div className="label">
                        <label htmlFor="inputID">ID</label> 
                        <label htmlFor="inputTitle">Name</label> 
                        <label htmlFor="inputPrice">Price</label> 
                        <label htmlFor="inputAmount">Amount</label>
                        <label htmlFor="inputIMG">URL</label>
                    </div>

                    <div className="input">
                        <input id="inputID" defaultValue={editableTr.id} disabled></input>
                        <input id="inputTitle" defaultValue={editableTr.title}></input>
                        <input id="inputPrice" defaultValue={editableTr.price}></input>
                        <input id="inputAmount" defaultValue={editableTr.amount}></input>
                        <input id="inputIMG" defaultValue={editableTr.img}></input>
                    </div>
                </div>

                    <div className="btn-wrapper">
                        {
                            noUpdates 
                                ? <button className="product-btn" onClick={saveProductChanges} disabled>save</button>
                                : <button className="product-btn" onClick={saveProductChanges}>save</button>
                        }
                        <button className="product-btn" onClick={cancelProductChanges}>cancel</button>
                    </div>

            </div>
        )
    }


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
                    {
                        productsList.map( product => {
                            return <Product 
                                key = {product.id} 
                                id = {product.id} 
                                img = {product.img} 
                                title = {product.title} 
                                price = {product.price} 
                                amount = {product.amount} 
                                isSelected = {product === selectedTr}
                                cbTrChanged = {trChanged}
                                cbProductsListChanged = {productsListChanged} 
                                cbProductEdit = {productEdit}
                                notEditeInProgress = {noUpdates}
                            />
                    })}
                </tbody>
            </table>

            <div className="wrapper">
                <button className="btn">new product</button>

                {
                    productCardMode === 1 ? <FirstMode /> 
                    : productCardMode === 2 ? <SecondMode />
                    : null
                }


            </div>
        </div>
    );
};

Shop.propTypes = {
    shopName: PropTypes.string.isRequired
};
 
export default Shop;