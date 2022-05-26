import React from 'react';
import { db } from '../../firebase';

class RaidStep extends React.Component {

    changeProgress = () => {

        if (this.props.admin === true && this.props.lock === false) {
            db.collection( this.props.roster ).doc('progress').collection('raid').doc( this.props.raidId ).set({
                bossDown: this.props.bossNumber
            }, {merge: true})
        }
        
    }
    
    render(){

        const check = this.props.check === true ? 'check' : '';
        const pointer = this.props.admin === true ? 'pointer' : '';

        return(
            <div className={`progress-step ${check} ${pointer}`} onClick={this.changeProgress}></div>
        )

    }

}

export default RaidStep;