import React from 'react';
import PropTypes from 'prop-types';

import {clientEvents} from "./../helpers/events";

import "./Client.css";

class Client extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        })
    }

    newFamRef = React.createRef();
    newBalanceRef = React.createRef();

    state = {
        info: this.props.info
    }

    componentDidUpdate = (oldProps, oldState) => {
        console.log(`Client id = ${this.state.info.id} componentDidUpdate`);

        if  ( this.props.info.balance !== this.state.info.balance || this.props.info.fam !== this.state.info.fam ) 
            this.setState({info:this.props.info})
    }


    setNewInfo = () => {
        if ( this.newFamRef && this.newBalanceRef ) {
            if ( this.newFamRef.current.value && this.newBalanceRef.current.value) {
                const newFam = this.newFamRef.current.value;
                const newBalance = +this.newBalanceRef.current.value;
                clientEvents.emit("EClientInfoChanged", this.state.info.id, newFam, newBalance);
            }
        }
    };


    render() {

        console.log(`Client id=${this.state.info.id}`);

        return (

            <tr>
                <td> 
                    {
                        !this.props.isEdit 
                            ? <span className="client-fio">{this.state.info.fam}</span>
                            : <input defaultValue={this.state.info.fam} ref={this.newFamRef}></input>
                    }
                </td>
                <td>
                    {
                        !this.props.isEdit 
                            ? <span className="client-fio">{this.state.info.im}</span>
                            : <input defaultValue={this.state.info.im} disabled></input>
                    }  
                </td>
                <td>
                    {
                        !this.props.isEdit 
                            ? <span className="client-fio">{this.state.info.otch}</span>
                            : <input defaultValue={this.state.info.otch} disabled></input>
                    }  
                </td>
                <td>
                    {
                        !this.props.isEdit 
                            ? <span className="client-balance">{this.state.info.balance}</span>
                            : <input defaultValue={this.state.info.balance}  ref={this.newBalanceRef}></input>
                    }
                </td>
                <td className = { this.state.info.balance >= 0 ? "client-active" : "client-blocked"}>
                    {
                        this.state.info.balance >= 0 
                            ? <span>active</span>
                            : <span>blocked</span>
                    }
                </td>
                <td>
                    {
                        !this.props.isEdit 
                            ? <button className="client-btn" onClick={ () => clientEvents.emit("EClientEditing", this.state.info.id) }>Редактировать</button>
                            : <button className="client-btn" onClick={this.setNewInfo}>Сохранить</button>
                    }              
                </td>
                <td>
                    <button className="client-btn" onClick={ () => clientEvents.emit("EClientDeleted", this.state.info.id) }>Удалить</button>              
                </td>
            </tr>
        )
    }

}
 
export default Client;