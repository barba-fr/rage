import React from "react";
import {db} from "../../firebase";

import spe from '../../spe';

class ClassStatus extends React.Component {

    state = {
        recruitment: {}
    }

    componentDidMount(){
        db.collection(this.props.roster).doc("recruitment").collection(this.props.wowClass).doc("spe").onSnapshot( doc => {
            this.setState({ recruitment: doc.data() })
        })
    }

    showClassEditor = () => {

        let recruitment = {};
        if (!this.state.recruitment) {
            const speArray = spe[this.props.wowClass];
            speArray.forEach(key => {
                recruitment[key] = 0;
            });
        } else {
            recruitment = this.state.recruitment;
        }

        this.props.showClassEditor(this.props.roster, this.props.wowClass);
    }
    
    render(){

        let checkZeros = 0;
        let statusText;
        if (this.state.recruitment) {
            
            const recruitment = {...this.state.recruitment}
   
            Object.keys(recruitment).forEach( key => {
                checkZeros = checkZeros + recruitment[key]
            } )

            if (checkZeros === 0) {
                statusText = "Fermé";
            } else if ( recruitment.allClass === true ) {
                statusText = "Ouvert";
            } else {

                statusText = Object.keys(recruitment).map( key => 
                    this.state.recruitment[key] > 0 && this.state.recruitment.allClass === false ?
                        <p key={`${this.props.roster}_${this.props.wowClass}_${key}`}>
                            {this.state.recruitment[key]} <span className="spe">{key}</span> 
                        </p>
                    : null
                );

            }


        } else {
            statusText = "Fermé"
        }
            
        const isClosed = statusText === "Fermé" ? 'closed' : '';
        const cursorPointer = this.props.admin === true ? 'pointer' : 'normal';

        return(
            <div className={`class-status ${ isClosed }`} onClick={this.showClassEditor}>

                <div className="class-icon" style={{ cursor: cursorPointer }}>
                    <img src={require(`../../assets/class-icons/${ this.props.wowClass }.png`).default} alt={ `${ this.props.wowClass } icon` }/>
                </div>
                
                <div className="class-status-text">
                    { statusText }
                </div>

            </div>
        )
    }

}

export default ClassStatus;