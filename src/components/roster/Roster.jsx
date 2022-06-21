import { useEffect, useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5'

import PlayerCard from './PlayerCard';

import { db } from '../../firebase'

function Roster(props) {

    const [tank, setRosterTank] = useState([])
    const [heal, setRosterHeal] = useState([])
    const [cac, setRosterCac] = useState([])
    const [range, setRosterRange] = useState([])

    useEffect( function() {

        let tankData = []
        let healData = []
        let cacData = []
        let rangeData = []

        db.collection('roster').onSnapshot( snap => {
            let docs = snap.docs
            docs.forEach( doc => {
                if ( doc.data().role === 'tank' ) {
                    tankData.push( doc.data() )
                } else if ( doc.data().role === 'heal' ) {
                    healData.push( doc.data() )
                } else if ( doc.data().role === 'cac' ) {
                    cacData.push( doc.data() )
                } else if ( doc.data().role === 'range' ) {
                    rangeData.push( doc.data() )
                }
            } )
        } )

        setRosterTank( tankData )
        setRosterHeal( healData )
        setRosterCac( cacData )
        setRosterRange( rangeData )

    }, [] )

    const adminAddPlayer = () => {
        console.log('add player');
    }

    const AdminControl = (props) => {
		return(
			<div className="admin-controls">
				<IoAddCircleSharp onClick={adminAddPlayer} />
			</div>
		)
	} 

    const tankList = () => {

       console.log([...tank]);

    }

    return (
        <main id="roster">

            <div className="roster-header admin">
                <h1>Roster</h1>
                { props.admin === true && AdminControl() }
            </div>

            <div id="roster-content">

                <h2>Tanks</h2>
                <div className="players-list">
                    { tank && tankList() }
                </div>

                <h2>Healers</h2>
                <div className="players-list"></div>

                <h2>Cacs</h2>
                <div className="players-list"></div>

                <h2>Ranges</h2>
                <div className="players-list"></div>

            </div>

        </main>
    );
}

export default Roster