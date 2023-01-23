import React from 'react';
import PropTypes from 'prop-types';

import Client from './Client';
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

    state = {
        clients: this.props.clients,
        clientsFilter: [...this.props.clients],
        filterMode: false
    }

    showAllClients = () => {
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

            if ( 
                JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clients) 
                && JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clientsFilter) 
            ) {
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

            if ( 
                JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clients) 
                && JSON.stringify(newClientsFilter) !== JSON.stringify(this.state.clientsFilter) 
            ) {
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

    
    setBalance = (clientID, newBalance) => {
        let changed = false;

        const newClients = [...this.state.clients];
        newClients.forEach( (client, index) => {

            if( client.id === clientID && client.balance !== newBalance ) {
                let newClient = {...client};
                newClient.balance = newBalance;

                newClients[index] = newClient;
                changed = true;
            }
        });

        if (changed) 
            this.setState({clients: newClients})
    }


    render() {
        console.log("Company render");

        const arr = !this.state.filterMode ? this.state.clients : this.state.clientsFilter;
        const clientsCode = arr.map( client =>
            <Client 
                key = {client.id} 
                info = {client} 
                cbSetBalance = {this.setBalance}
                cbDeleteClient = {this.deleteClient}
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
                            <th>Рудактировать</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                    
                        <tbody>
                            {clientsCode}
                        </tbody>
                    </table>
    
                    <button className="btn">Добавить клиента</button>
                </div>
            )
    }
}

export default Company;