import React from 'react';
import PropTypes from 'prop-types';

import Product from "./Product";
import ProductCard from "./ProductCard";
import products from '../helpers/productsList.json';
import "./Shop.css";


class Shop extends React.Component {

    static propTypes = {
        shopName: PropTypes.string.isRequired
    }

    state = {
        selectedTr: null, /* Объект выделенного товара */
        productsList: [...products], /* Текущий список товаров */
        noEditingNow: true, /* Состояние, отображающее НЕ редактируется / НЕ создается ли сейчас товар (приходит от компонента ProductCard) */ 
        productCardMode: 0 /* Режим отображения карточки товара */
    }

    trChanged = trID => {
        this.setState({
            selectedTr: this.state.productsList.find( product => product.id === trID ),
            productCardMode: 1
        })
    }

    productsListChanged = trID => {
        this.setState( currentValue => {return {
            productsList: currentValue.productsList.filter( product => product.id !== trID )
        }});

        if ( this.state.selectedTr && trID === this.state.selectedTr.id ) {
            this.setState({
                selectedTr: null,
                productCardMode: 0
            })
        }
    }

    productEdit = trID => {
        this.setState({
            selectedTr: this.state.productsList.find( product => product.id === trID ),
            productCardMode: 2
        })
    }

    saveProductChanges = objWithChanges => {

        this.setState( currentValue => {
            currentValue.selectedTr.title = objWithChanges.title;
            currentValue.selectedTr.price = objWithChanges.price;
            currentValue.selectedTr.amount = objWithChanges.amount;
            currentValue.selectedTr.img = objWithChanges.img;
            
            return {
                selectedTr: currentValue.selectedTr,
                productCardMode: 1
            }
        });
    }

    addNewProduct = newObj => {

        this.setState( currentValue => {

            const newArr = [...currentValue.productsList];
            newArr.push(newObj);
            
            return {
                productsList: newArr,
                productCardMode: 0,
                noEditingNow: true
            }
        });
    }

    cancelProductChanges = () => {

        if (this.state.selectedTr === null) {
            this.setState({ 
                productCardMode: 0
            });
        } else {
            this.setState({ 
                productCardMode: 1
            });
        }

        this.setState({ 
            noEditingNow: true
        });
    }

    productChangeStatus = currentValue => {

        if (this.state.noEditingNow === currentValue) return;

        this.setState({
            noEditingNow: this.state.selectedTr === null && this.state.productCardMode !== 3 ? true : currentValue
        });
    }

    createNewProduct = () => {
        this.setState({ 
            selectedTr: null,
            productCardMode: 3 
        });
    }


    render() {

        return (

            <div className="container"> 

                <h1>Товары магазина &laquo;{this.props.shopName}&raquo;</h1>

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
                            this.state.productsList.map( product => {
                                return <Product 
                                    key = {product.id} 
                                    id = {product.id} 
                                    img = {product.img} 
                                    title = {product.title} 
                                    price = {product.price} 
                                    amount = {product.amount} 
                                    isSelected = {product === this.state.selectedTr}
                                    cbTrChanged = {this.trChanged}
                                    cbProductsListChanged = {this.productsListChanged} 
                                    cbProductEdit = {this.productEdit}
                                    productNoEditingNow = {this.state.noEditingNow}
                                />
                        })}
                    </tbody>
                </table>

                <div className="wrapper">
                    {
                        this.state.noEditingNow 
                            ? <button className="btn" onClick={this.createNewProduct}>new product</button>
                            : <button className="btn" onClick={this.createNewProduct} disabled>new product</button>
                    }

                    <ProductCard 
                        workmode = {this.state.productCardMode}
                        selectedTr = {this.state.selectedTr}
                        lastID = {this.state.productsList.length !== 0 ? this.state.productsList[this.state.productsList.length - 1]?.id : 0}
                        cbSaveProductChanges = {this.saveProductChanges}
                        cbAddNewProduct = {this.addNewProduct}
                        cbCancelProductChanges = {this.cancelProductChanges}
                        cbProductChangeStatus = {this.productChangeStatus} 
                    />

                </div>
            </div>
        )
    }

};

export default Shop;