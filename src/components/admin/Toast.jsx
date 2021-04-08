import React from 'react';

class Toast extends React.Component {
    render(){
        return (
            <div className={`toast ${this.props.type}`}>
                <div className="toast-header">{ this.props.header }</div>
                <div className="toast-body">{ this.props.message }</div>
            </div>
        );
    }
}

export default Toast;