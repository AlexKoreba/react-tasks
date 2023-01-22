import { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';

import "./ProductCard.css";

const ProductCard = (props) => {

    const [editableTr, setEditableTr] = useState( {id: "", title: "", price: "", img: "", amount: ""} ); /* Состояние (объект), в который перезаписыватся текущие значения из инпутов */
    const [newTr, setNewTr] = useState( {id: props.lastID + 1, title: "", price: "", img: "", amount: ""} );
    const [noUpdates, setNoUpdates] = useState(true); /* Состояние, отображающее НЕ редактируется ли сейчас товар (false - редактируется, true - нет) */

    /* Валидация */
    const [validTitle, setValidTitle] = useState(true);
    const [validPrice, setValidPrice] = useState(true);
    const [validImg, setValidImg] = useState(true);
    const [validAmount, setValidAmount] = useState(true);
    const [validMain, setValidMain] = useState(true);


    useEffect( () => {

        if (props.workmode === 3) {
            setValidTitle(false);
            setValidPrice(false);
            setValidImg(false);
            setValidAmount(false);
        }
        
    }, [props.workmode]);

    useEffect( () => {
        setValidMain( validTitle && validPrice && validImg && validAmount );
    }, [validTitle, validPrice, validImg, validAmount])


    // Функции, записывающие в объект текущее значение из соответствующего инпута:
    const changeInputTitle = event => {
        if (props.workmode === 2) setEditableTr( obj => Object.assign( {}, obj, {title: event.target.value} ));
        if (props.workmode === 3) setNewTr( obj => Object.assign( {}, obj, {title: event.target.value} ));

        if (event.target.value) {
            setValidTitle(true);
        } else {
            setValidTitle(false);
        }
    }

    const changeInputPrice = event => {

        if ( 
            !isFinite(event.target.value) 
            || (event.target.value.includes(".") && event.target.value.length > event.target.value.indexOf(".") + 3) 
            ) 
        return;

        if (props.workmode === 2) setEditableTr( obj => Object.assign( {}, obj, {price: event.target.value} ));
        if (props.workmode === 3) setNewTr( obj => Object.assign( {}, obj, {price: event.target.value} ));

        if ( event.target.value > 0 ) {
            setValidPrice(true);
        } else {
            setValidPrice(false);
        }
    }

    const changeInputImg = event => {
        if (props.workmode === 2) setEditableTr( obj => Object.assign( {}, obj, {img: event.target.value} ));
        if (props.workmode === 3) setNewTr( obj => Object.assign( {}, obj, {img: event.target.value} ));

        if ( event.target.value.endsWith('.jpg') && event.target.value.trim().length > 4 ) {
            setValidImg(true);
        } else {
            setValidImg(false);
        }
    }

    const changeInputAmount = event => {

        if ( 
            !isFinite(event.target.value) 
            || event.target.value.includes(".") 
            ) 
        return;

        if (props.workmode === 2) setEditableTr( obj => Object.assign( {}, obj, {amount: +event.target.value} ));
        if (props.workmode === 3) setNewTr( obj => Object.assign( {}, obj, {amount: +event.target.value} ));

        if ( event.target.value > 0 ) {
            setValidAmount(true);
        } else {
            setValidAmount(false);
        }
    }

    // Функция передачи объекта с данными товара родителю:
    const saveChanges = () => {

        if (props.workmode === 2) {
            props.cbSaveProductChanges(editableTr);
            setEditableTr(props.selectedTr);
        }

        if (props.workmode === 3) {
            props.cbAddNewProduct(newTr);
            setNoUpdates(true);
        }
    }

    // Функция отмены (сброса) внесенных изменений в карточку товара и вызова функции родителя (переключение режима отображения карточки товара):
    const cancelChanges = () => {
        props.cbCancelProductChanges();
        setEditableTr( props.selectedTr ? {...props.selectedTr} : {id: "", title: "", price: "", img: "", amount: ""} );
        setNewTr( {id: props.lastID + 1, title: "", price: "", img: "", amount: ""} );
        setNoUpdates(true);

        setValidTitle(true);
        setValidPrice(true);
        setValidImg(true);
        setValidAmount(true);
    }


    // Следим за изтенением пропса с выделенным товаром и изменяем значение редактируемого товара:
    useEffect( () => {

        if (props.selectedTr) {
            setEditableTr( {...props.selectedTr} );
        }

        setNewTr( {id: props.lastID + 1, title: "", price: "", img: "", amount: ""} );

    }, [props.selectedTr, props.lastID]);

    // Следим за идентичностью (равенством ключей и значений двух объектов) пропса с выделенным товаром и текущего значения редактируемого товара, и изменяем состояние редактирования:
    useEffect( () => {
        if (props.selectedTr) {
            setNoUpdates( JSON.stringify(props.selectedTr) === JSON.stringify(editableTr) );
        }
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


    // Повторяющийся кусок JSX-кода (форма с полями и кнопками):
    const workmodeForm  =    
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
                    <input id="inputID" value={props.workmode === 2 ? editableTr.id : newTr.id} disabled></input>
                    <input id="inputTitle" value={props.workmode === 2 ? editableTr.title : newTr.title} onChange={changeInputTitle}></input>
                    <input id="inputPrice" value={props.workmode === 2 ? editableTr.price : newTr.price} onChange={changeInputPrice}></input>
                    <input id="inputAmount" value={props.workmode === 2 ? editableTr.amount : newTr.amount} onChange={changeInputAmount}></input>
                    <input id="inputIMG" value={props.workmode === 2 ? editableTr.img : newTr.img} onChange={changeInputImg}></input>
                </div>

                <div className="error">
                    <span className={validTitle ? "hidden" : null}>*value must not be empty</span>
                    <span className={validPrice ? "hidden" : null}>*value must be a a rational number</span>
                    <span className={validAmount ? "hidden" : null}>*value must be a positive integer</span>
                    <span className={validImg ? "hidden" : null}>*value must end with &laquo;.jpg&raquo;</span>
                </div>
            </div>

            <div className="btn-wrapper">
                {
                    noUpdates || !validMain 
                        ? <button className="product-btn" onClick={saveChanges} disabled>save</button>
                        : <button className="product-btn" onClick={saveChanges}>save</button>
                }
                <button className="product-btn" onClick={cancelChanges}>cancel</button>
            </div>
        </Fragment>
  
     
    return ( 

        <Fragment>
            { props.workmode 
                ? <div className="product-card">

                    { props.workmode === 1 &&
                        <Fragment key={props.workmode}>
                            <h2 className="product-title">{props.selectedTr.title}</h2>
                            <p className="product-price">Price: {(+props.selectedTr.price).toFixed(2)}</p>
                            <p className="product-amount">Amount: {props.selectedTr.amount}</p>
                        </Fragment>
                    }

                    { props.workmode === 2 && workmodeForm }

                    { props.workmode === 3 && workmodeForm }

                </div>
                : null
            }
        </Fragment>   
    );
}

ProductCard.propTypes = {
    workmode: PropTypes.number.isRequired,
    selectedTr: PropTypes.object,
    cbSaveProductChanges: PropTypes.func.isRequired,
    cbAddNewProduct: PropTypes.func.isRequired,
    cbCancelProductChanges: PropTypes.func.isRequired,
    cbProductChangeStatus: PropTypes.func.isRequired
}

export default ProductCard;