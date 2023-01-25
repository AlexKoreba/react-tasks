import React from 'react';
import PropTypes from 'prop-types';

import Client from './Client';
import {clientEvents} from "./../helpers/events";

import "./Company.css";


class Company extends React.PureComponent {

    static propTypes = {
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        )
    }

    newClientIDRef = React.createRef();
    newClientFamRef = React.createRef();
    newClientImRef = React.createRef();
    newClientOtchRef = React.createRef();
    newClientBalanceRef = React.createRef();

    state = {
        clients: this.props.clients,
        clientsFilter: [...this.props.clients],
        filterMode: false,
        editableClient: null,
        newClient: {id: [...this.props.clients].length + 1, fam: "", im: "", otch: "", balance: ""},
        newClientMode: false
    }


    componentDidMount = () => {
        clientEvents.addListener("EClientDeleted", this.deleteClient);
        clientEvents.addListener("EClientEditing", this.editClient);
        clientEvents.addListener("EClientInfoChanged", this.setClientInfo);
    }
    
    componentWillUnmount = () => {
        clientEvents.removeListener("EClientDeleted", this.deleteClient);
        clientEvents.removeListener("EClientEditing", this.editClient);
        clientEvents.removeListener("EClientInfoChanged", this.setClientInfo);
    }


    showAllClients = () => {

        if (this.state.clients.length !== this.state.clientsFilter.length) {
            this.setState({clientsFilter: [...this.state.clients]});
        }

        this.setState({
            filterMode: false
        });
    }

    showActiveClients = () => {

        const newClientsFilter = this.state.clients.filter( client => client.balance >= 0 );

        if ( this.state.clientsFilter.length === 0 ) {

            if ( this.state.clients.length === 0 || newClientsFilter.length !== 0 ) {
                this.setState({filterMode: false});
            } else {
                this.setState({filterMode: true});
            }

        } else {

            if ( JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clients) ) {
                this.setState({
                    clientsFilter: newClientsFilter,
                    filterMode: true
                });
            }
        }
    }

    showBlockedClients = () => {

        const newClientsFilter = this.state.clients.filter( client => client.balance < 0 );

        if ( this.state.clientsFilter.length === 0 ) {

            if ( this.state.clients.length === 0 || newClientsFilter.length !== 0 ) {
                this.setState({filterMode: false});
            } else {
                this.setState({filterMode: true});
            }

        } else {

            if ( JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clients) ) {
                this.setState({
                    clientsFilter: newClientsFilter,
                    filterMode: true
                });
            }
        }
    }


    deleteClient = clientID => {
        const newClients = this.state.clients.filter( client => client.id !== clientID );
        this.setState({clients: newClients});

        if (this.state.clientsFilter.some( client => client.id === clientID )) {
            const newClientsFilter = this.state.clientsFilter.filter( client => client.id !== clientID );
            this.setState({clientsFilter: newClientsFilter});
        }
    }

    editClient = clientID => {
        this.setState({
            editableClient: this.state.clients.find( client => client.id === clientID )
        });
    }

    setClientInfo = (clientID, newFam, newBalance) => {

        let changed = false;

        const newClients = [...this.state.clients];
        newClients.forEach( (client, index) => {

            if ( client.id === clientID && (client.fam !== newFam || client.balance !== newBalance) ) {
                let newClient = {...client};

                if (client.fam !== newFam) {
                    newClient.fam = newFam;
                }

                if (client.balance !== newBalance) {
                    newClient.balance = newBalance;
                }

                newClients[index] = newClient;
                changed = true;
            }
        });

        if (changed) {

            this.setState({
                clients: newClients
            })

            const newClientsFilter = [...this.state.clientsFilter];
            newClientsFilter.forEach( (client, index) => {
    
                if ( client.id === clientID ) {
                    let newClientFilter = {...client};
    
                    if (client.fam !== newFam) {
                        newClientFilter.fam = newFam;
                    }
    
                    if (client.balance !== newBalance) {
                        newClientFilter.balance = newBalance;
                    }
    
                    newClientsFilter[index] = newClientFilter;
                }
            });

            if (this.state.filterMode) {

                if ( this.state.clientsFilter[0].balance >= 0 ) {
                    this.setState({
                        clientsFilter: newClientsFilter
                    }, this.showActiveClients);
                }
            
                if ( this.state.clientsFilter[0].balance < 0 ) {
                    this.setState({
                        clientsFilter: newClientsFilter
                    }, this.showBlockedClients);
                }
            }     
        } 

        this.setState({
            editableClient: null
        }); 
    }

    setNewClientInfo = () => {
        if ( this.newClientFamRef && this.newClientImRef && this.newClientOtchRef && this.newClientBalanceRef ) {
            if ( this.newClientFamRef.current.value && this.newClientImRef.current.value && this.newClientOtchRef.current.value && this.newClientBalanceRef.current.value) {

                const newClient = {
                    id: +this.newClientIDRef.current.value,
                    fam: this.newClientFamRef.current.value,
                    im: this.newClientImRef.current.value,
                    otch: this.newClientOtchRef.current.value,
                    balance: +this.newClientBalanceRef.current.value
                };

                const newClients = [...this.state.clients, newClient];

                this.setState({
                    clients: newClients,
                    newClient: {id: newClient.id + 1, fam: "", im: "", otch: "", balance: ""},
                    newClientMode: false
                }); 

                if (this.state.filterMode) {
                    const newClientsFilter = [...this.state.clientsFilter, newClient]; 

                    if (this.state.clientsFilter.length !== 0) {
                        if ( 
                            (newClient.balance < 0 && this.state.clientsFilter[0].balance < 0 ) 
                            || (newClient.balance >= 0 && this.state.clientsFilter[0].balance >= 0 )
                        ) {
                            this.setState({
                                clientsFilter: newClientsFilter
                            }); 
                        }
                    } else {
                        if ( 
                            (newClient.balance < 0 && this.state.clients[0].balance >= 0 ) 
                            || (newClient.balance >= 0 && this.state.clients[0].balance < 0 )
                        ) {
                            this.setState({
                                clientsFilter: newClientsFilter
                            }); 
                        }
                    }
                }
            }
        }
    };


    
    render() {
        console.log("Company render");

        const arr = !this.state.filterMode ? this.state.clients : this.state.clientsFilter;
        const clientsCode = arr.map( client =>
            <Client 
                key = {client.id} 
                info = {client} 
                isEdit = {this.state.editableClient?.id === client.id}
            />
        );

        return (

            <div className="container"> 
    
                <button className="btn" onClick={this.showAllClients}>Все</button>
                <button className="btn" onClick={this.showActiveClients}>Активные</button>
                <button className="btn" onClick={this.showBlockedClients}>Заблокированные</button>
    
                <table border={1}>
    
                    <thead>
                        <tr>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>  
                            <th>Баланс</th>
                            <th>Статус</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {clientsCode}
                    </tbody>
                </table>
    
                <button className="btn" onClick={ () => this.setState({newClientMode: true}) }>Добавить клиента</button>

                {
                    this.state.newClientMode &&

                        <div className="new-client">
                            <div>
                                <div className="label">
                                <label htmlFor="inputID">ID</label> 
                                <label htmlFor="inputFam">Фамилия</label> 
                                <label htmlFor="inputIm">Имя</label> 
                                <label htmlFor="inputOtch">Отчество</label>
                             <label htmlFor="inputBalance">Баланс</label>
                            </div>

                            <div className="input">
                                <input id="inputID" defaultValue={this.state.newClient.id} disabled ref={this.newClientIDRef}></input>
                                <input id="inputFam" defaultValue={this.state.newClient.fam} ref={this.newClientFamRef}></input>
                                <input id="inputIm" defaultValue={this.state.newClient.im} ref={this.newClientImRef}></input>
                                <input id="inputOtch" defaultValue={this.state.newClient.otch} ref={this.newClientOtchRef}></input>
                                <input id="inputBalance" defaultValue={this.state.newClient.balance} ref={this.newClientBalanceRef}></input>
                            </div>
                        </div>

                        <div className="btn-wrapper">
                            <button className="btn" onClick={this.setNewClientInfo}>сохранить</button>
                            <button className="btn" onClick={ () => this.setState({newClientMode: false}) }>отмена</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Company;