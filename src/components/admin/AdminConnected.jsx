import React from 'react';
import { IoPower } from 'react-icons/io5';

class AdminConnected extends React.Component {
    render(){
        return (
           
            <div id="admin-connected">
                Vous êtes connecté en tant qu'admin.
                <button type="button" className="button-link" onClick={this.props.logout}>
                    <IoPower /> Déconnexion
                </button> 
            </div>
        );
    }
}

export default AdminConnected