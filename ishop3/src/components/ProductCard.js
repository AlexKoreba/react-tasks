import { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

import "./ProductCard.css";

const ProductCard = (props) => {

    const [editableTr, setEditableTr] = useState( {...props.selectedTr} ); /* Состояние (объект), в который перезаписыватся текущие значения из инпутов */
    const [newTr, setNewTr] = useState( {id: props.lastID + 1, title: "", price: "", img: "", amount: ""} );
    const [noUpdates, setNoUpdates] = useState(true); /* Состояние, отображающее НЕ редактируется ли сейчас товар (false - редактируется, true - нет) */


    const inputID = useRef(null);
    const inputTitle = useRef(null);
    const inputPrice = useRef(null);
    const inputAmount = useRef(null);
    const inputImg = useRef(null);


    // Функция записывающая в объект текущие значения из инпутов (для редактирования продукта):
    const changeInputText = event => {

        if (event.target.value === inputTitle.current.value) {
            setEditableTr( obj => Object.assign({}, obj, {title: inputTitle.current.value}) );
        }

        if (event.target.value === inputPrice.current.value) {
            setEditableTr( obj => Object.assign({}, obj, {price: +inputPrice.current.value}) );
        }

        if (event.target.value === inputImg.current.value) {
            setEditableTr( obj => Object.assign({}, obj, {img: inputImg.current.value}) );
        }

        if (event.target.value === inputAmount.current.value) {
            setEditableTr( obj => Object.assign({}, obj, {amount: +inputAmount.current.value}) );
        }
        
        // setEditableTr( {
        //     id: +inputID.current.value,
        //     title: inputTitle.current.value,
        //     price: +inputPrice.current.value,
        //     img: inputImg.current.value,
        //     amount: +inputAmount.current.value
        // }); 
    };

    // Функция записывающая в объект текущие значения из инпутов (для создания продукта):
    const changeNewProductInputText = event => {

        if (event.target.value === inputTitle.current.value) {
            setNewTr( obj => Object.assign({}, obj, {title: inputTitle.current.value}) );
        }

        if (event.target.value === inputPrice.current.value) {
            setNewTr( obj => Object.assign({}, obj, {price: +inputPrice.current.value}) );
        }

        if (event.target.value === inputImg.current.value) {
            setNewTr( obj => Object.assign({}, obj, {img: inputImg.current.value}) );
        }

        if (event.target.value === inputAmount.current.value) {
            setNewTr( obj => Object.assign({}, obj, {amount: +inputAmount.current.value}) );
        }
    };

    // Функция передачи объекта с изменёнными данными товара родителю:
    const saveChanges = () => {
        props.cbSaveProductChanges(editableTr);
        setEditableTr(props.selectedTr);
    }

    // Функция передачи родителю объекта нового товара:
    const saveChangesNewProduct = () => {
        props.cbSaveNewProduct(newTr);
        setNoUpdates(true);
    }

    // Функция отмены (сброса) внесенных изменений в карточке товара и вызова функции родителя (переключение режима отображения карточки товара):
    const cancelChanges = () => {
        props.cbCancelProductChanges();
        setEditableTr(props.selectedTr);
        setNewTr({id: props.lastID + 1, title: "", price: "", img: "", amount: ""});
        setNoUpdates(true);
    }

    // Следим за изтенением пропса с выделенным товаром и изменяем значение редактируемого товара:
    useEffect( () => {
        setEditableTr( {...props.selectedTr} );
        setNewTr({id: props.lastID + 1, title: "", price: "", img: "", amount: ""});
    }, [props.selectedTr, props.lastID]);

    // Следим за идентичностью (равенством ключей и значений двух объектов) пропса с выделенным товаром и текущего значения редактируемого товара, и изменяем состояние редактирования:
    useEffect( () => {
        setNoUpdates( JSON.stringify(props.selectedTr) === JSON.stringify(editableTr) );
    }, [props.selectedTr, editableTr]);

    // Следим за состоянием редактирования и передаем текущее значение родителю:
    useEffect( () => {
        props.cbProductChangeStatus(noUpdates);
    }, [props, noUpdates]);

    useEffect( () => {
        if (props.workmode === 3) {
            setNoUpdates(false);
        }
    }, [props.workmode]);


    return ( 
        <div className={props.workmode ? "product-card" : "none"}>

            { props.workmode === 1 &&
                <Fragment key={props.workmode}>
                    <h2 className="product-title">{props.selectedTr.title}</h2>
                    <p className="product-price">Price: {props.selectedTr.price.toFixed(2)}</p>
                    <p className="product-amount">Amount: {props.selectedTr.amount}</p>
                </Fragment>
            }

            { props.workmode === 2 &&
                <Fragment key={props.workmode}>
                    <div>
                        <div className="label">
                            <label htmlFor="inputID">ID</label> 
                            <label htmlFor="inputTitle">Name</label> 
                            <label htmlFor="inputPrice">Price</label> 
                            <label htmlFor="inputAmount">Amount</label>
                            <label htmlFor="inputIMG">URL</label>
                        </div>

                        <div className="input">
                            <input id="inputID" value={editableTr?.id} disabled onChange={changeInputText} ref={inputID}></input>
                            <input id="inputTitle" value={editableTr?.title} onChange={changeInputText} ref={inputTitle}></input>
                            <input id="inputPrice" value={editableTr?.price} onChange={changeInputText} ref={inputPrice}></input>
                            <input id="inputAmount" value={editableTr?.amount} onChange={changeInputText} ref={inputAmount}></input>
                            <input id="inputIMG" value={editableTr?.img} onChange={changeInputText} ref={inputImg}></input>
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        {
                            noUpdates 
                                ? <button className="product-btn" onClick={saveChanges} disabled>save</button>
                                : <button className="product-btn" onClick={saveChanges}>save</button>
                        }
                        <button className="product-btn" onClick={cancelChanges}>cancel</button>
                    </div>
                </Fragment>
            }

            { props.workmode === 3 &&
                <Fragment key={props.workmode}>
                    <div>
                        <div className="label">
                            <label htmlFor="inputID">ID</label> 
                            <label htmlFor="inputTitle">Name</label> 
                            <label htmlFor="inputPrice">Price</label> 
                            <label htmlFor="inputAmount">Amount</label>
                            <label htmlFor="inputIMG">URL</label>
                        </div>

                        <div className="input">
                            <input id="inputID" value={newTr.id} disabled onChange={changeNewProductInputText} ref={inputID}></input>
                            <input id="inputTitle" value={newTr.title} onChange={changeNewProductInputText} ref={inputTitle}></input>
                            <input id="inputPrice" value={newTr.price} onChange={changeNewProductInputText} ref={inputPrice}></input>
                            <input id="inputAmount" value={newTr.amount} onChange={changeNewProductInputText} ref={inputAmount}></input>
                            <input id="inputIMG" value={newTr.img} onChange={changeNewProductInputText} ref={inputImg}></input>
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        {
                            noUpdates 
                                ? <button className="product-btn" onClick={saveChangesNewProduct} disabled>save</button>
                                : <button className="product-btn" onClick={saveChangesNewProduct}>save</button>
                        }
                        <button className="product-btn" onClick={cancelChanges}>cancel</button>
                    </div>
                </Fragment>
            }

        </div>
    );
}

ProductCard.propTypes = {
    workmode: PropTypes.number.isRequired,
    selectedTr: PropTypes.object,
    cbSaveProductChanges: PropTypes.func.isRequired,
    cbSaveNewProduct: PropTypes.func.isRequired,
    cbCancelProductChanges: PropTypes.func.isRequired,
    cbProductChangeStatus: PropTypes.func.isRequired
}

export default ProductCard;