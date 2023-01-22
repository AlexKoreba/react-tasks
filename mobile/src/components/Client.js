import React from 'react';
import PropTypes from 'prop-types';

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

    state = {
        info: this.props.info
    }

    componentDidUpdate = (oldProps, oldState) => {
        console.log(`Client id = ${this.state.info.id} componentDidUpdate`);

        if ( this.props.info.balance !== this.state.info.balance)
            this.setState({
                info:this.props.info
            })
    }


    render() {

        console.log(`Client id=${this.state.info.id}`);

        return (

            <tr>
                <td> 
                    <span className="client-fio">{this.state.info.fam}</span>
                </td>
                <td>
                    <span className="client-fio">{this.state.info.im}</span>    
                </td>
                <td>
                    <span className="client-fio">{this.state.info.otch}</span>
                </td>
                <td>
                    <span className="client-balance">{this.state.info.balance}</span>
                </td>
                <td className = { this.state.info.balance >= 0 ? "client-active" : "client-blocked"}>
                    {
                        this.state.info.balance >= 0 
                            ? <span>active</span>
                            : <span>blocked</span>
                    }
                </td>
                <td>
                    <button className="client-btn" onClick={ () => this.props.cbSetBalance(this.state.info.id, 100) }>Редактировать</button>              
                </td>
                <td>
                    <button className="client-btn">Удалить</button>              
                </td>
            </tr>
        )
    }

}
 
export default Client;