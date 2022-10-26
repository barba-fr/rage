import React from 'react';
import { IoLockClosed, IoCheckbox, IoArrowForwardCircle } from 'react-icons/io5';
import RaidStep from './RaidStep';
import {db} from "../../firebase";

class RaidProgress extends React.Component {

    state = {
        raidData : {}
    }

    _isMounted = false;

    componentDidMount(){

        this._isMounted = true;

        db.collection( this.props.roster ).doc('progress').collection('raid').doc( this.props.raidId ).onSnapshot( raid => {
            if ( this._isMounted ) {
                this.setState({ raidData : raid.data() })
            }
        } )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleLock = () => {
        if ( this.props.admin === true ) {
            let lockStatus = !this.state.raidData.lock;
            db.collection( this.props.roster ).doc('progress').collection('raid').doc( this.props.raidId ).set({
                lock: lockStatus,
                bossDown: 0,
            }, {merge: true})
        }
    }

    render(){

        let lockIcon, lockOpacity, bossDown, bossTotal, raidName, steps, progressBar;
        if ( this.props.metaData && this.state.raidData) {      
            
            lockOpacity = this.state.raidData.lock === true ? "lock" : null;
            bossTotal = this.props.metaData.bossTotal;
            raidName = this.props.metaData.raidName;

            if ( this.state.raidData ) {

                if ( this.state.raidData.lock === true ) {
                    lockIcon = <IoLockClosed onClick={this.toggleLock} />
                } else if ( this.state.raidData.lock !== true && this.state.raidData.bossDown < this.props.metaData.bossTotal ) {
                    lockIcon = <IoArrowForwardCircle onClick={this.toggleLock} />
                } else {
                    lockIcon = <IoCheckbox onClick={this.toggleLock} />
                }
                lockOpacity = this.state.raidData.lock !== false ? "lock" : null;
                bossDown = this.state.raidData.bossDown;

            } else {

                bossDown = this.props.data.bossDown;

            }

            let stepsArray = [];
            for ( let i=1; i <= this.props.metaData.bossTotal; i++ ) {
                stepsArray.push('step')
            }
            steps = Object.keys(stepsArray).map( key => 
                <RaidStep 
                    key={key} 
                    admin={this.props.admin}
                    check={ key < bossDown ? true : false } 
                    bossNumber={Number(key) + 1}
                    raidId={this.props.raidId}
                    roster={this.props.roster}
                    lock={this.state.raidData.lock}
                />
            )

            let segments = this.props.metaData.bossTotal - 1
            let largeurSegment = 100 / segments;
            if ( bossDown > 0 ) {

                if ( this.props.raidId === "eyeeternity" || this.props.raidId === "obsidien" ) {
                    progressBar = 100
                } else {
                    progressBar = ( bossDown - 1 ) * largeurSegment
                }

            } else {
                progressBar = 0;
            }

        }

        return(
            <div className={`raid-progress ${lockOpacity}`} id={`${this.props.roster}_${this.props.raidId}`}>

                <div className="raid-progress-header">
                    <p className="raid-lock-status">{ lockIcon } { raidName }</p>
                    <p>{ bossDown } / { bossTotal }</p>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: progressBar + '%' }}></div>
                    { steps }
                </div>

            </div>
        );

    }

}

export default RaidProgress;