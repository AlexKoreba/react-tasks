import { useState } from "react";
import PropTypes from 'prop-types';

import Product from "./Product";
import ProductCard from "./ProductCard";
import products from './../helpers/productsList.json';
import "./Shop.css";


const Shop = (props) => {

    // Состояния товара: 
    const [selectedTr, setSelectedTr] = useState(null); /* Объект выделенного товара */
    const [productsList, setProductsList] = useState( [...products] ); /* Текущий список товаров */
    const [noEditingNow, setNoEditingNow] = useState(true); /* Состояние, отображающее НЕ редактируется / НЕ создается ли сейчас товар (приходит от компонента ProductCard) */ 
    const [productCardMode, setProductCardMode] = useState(0); /* Режим отображения карточки товара */

    
    // Функция поиска и выделения НУЖНОГО товара + переключения режима отображения карточки товара (режим просмотра информации о товаре):
    const trChanged = trID => {
        setSelectedTr( productsList.find( product => product.id === trID ));
        setProductCardMode(1);
    };

    // Функция удаления товара из списка товаров:
    const productsListChanged = trID => {
        setProductsList( currentValue => currentValue.filter( product => product.id !== trID ));

        if ( selectedTr && trID === selectedTr.id ) {
            setSelectedTr(null);
            setProductCardMode(0);
        } 
    };

    // Функция поиска и выделения РЕДАКТИРУЕМОГО товара + переключения режима отображения карточки товара (режим редактирования товара):
    const productEdit = trID => {
        setSelectedTr( productsList.find( product => product.id === trID ));
        setProductCardMode(2);
    };

    // Функция сохранения внесенных в товар изменений и переключения режима отображения карточки товара (режим просмотра информации о товаре):
    const saveProductChanges = objWithChanges => {

        setSelectedTr( currentValue => {
            currentValue.title = objWithChanges.title;
            currentValue.price = objWithChanges.price;
            currentValue.amount = objWithChanges.amount;
            currentValue.img = objWithChanges.img;
            return currentValue;
        })

        setProductCardMode(1);
    };

    // Функция добавления нового товара в текущий массив товаров:
    const addNewProduct = newObj => {

        setProductsList( currentValue => {
            const newArr = [...currentValue];
            newArr.push(newObj);
            return newArr;
        })

        setProductCardMode(0);
        setNoEditingNow(true);
    };

    // Функция сброса текущих состояний режима отображения карточки товара и процесса редактирования при отмене изменений:
    const cancelProductChanges = () => {

        if (selectedTr === null) {
            setProductCardMode(0);
        } else {
            setProductCardMode(1);
        }

        setNoEditingNow(true);
    }

    // Функция сохранения статуса (состояния) редактирования товаров:
    const productChangeStatus = currentValue => setNoEditingNow( selectedTr === null && productCardMode !== 3 ? true : currentValue);

    // Функция переключения режима отображения карточки товара (режим добавления нового товара):
    const createNewProduct = () => {
        setSelectedTr(null);
        setProductCardMode(3);
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
                                productNoEditingNow = {noEditingNow}
                            />
                    })}
                </tbody>
            </table>

            <div className="wrapper">
                {
                    noEditingNow 
                        ? <button className="btn" onClick={createNewProduct}>new product</button>
                        : <button className="btn" onClick={createNewProduct} disabled>new product</button>
                }

                <ProductCard 
                    workmode = {productCardMode}
                    selectedTr = {selectedTr}
                    lastID = {productsList[productsList.length - 1].id}
                    cbSaveProductChanges = {saveProductChanges}
                    cbAddNewProduct = {addNewProduct}
                    cbCancelProductChanges = {cancelProductChanges}
                    cbProductChangeStatus = {productChangeStatus} 
                />

            </div>
        </div>
    );
};

Shop.propTypes = {
    shopName: PropTypes.string.isRequired
};
 
export default Shop;