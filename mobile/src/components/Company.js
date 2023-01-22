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
        clients: this.props.clients
    }

    setBalance = (clientID, newBalance) => {
        let changed = false;

        let newClients = [...this.state.clients];
        newClients.forEach( (client, index) => {

            if( client.id === clientID && client.balance !== newBalance ) {
                let newClient = {...client};
                newClient.balance = newBalance;

                newClients[index] = newClient;
                changed = true;
            }
        });

        if (changed) 
            this.setState({
                clients: newClients
            })
    }


    render() {
        console.log("Company render");

        const clientsCode=this.state.clients.map( client =>
            <Client 
                key={client.id} 
                info={client} 
                cbSetBalance = {this.setBalance}
            />
        );

        return (

            <div className="container"> 
    
                <button className="btn">Все</button>
                <button className="btn">Активные</button>
                <button className="btn">Заблокированные</button>
    
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