import { useEffect, useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5'

import PlayerCard from './PlayerCard';

import { db } from '../../firebase'

function Roster(props) {

    const [roster, setRoster] = useState([])

    useEffect( function() {

        let rosterData = []

        db.collection('roster').onSnapshot( snap => {
            snap.docs.forEach( doc => {
                rosterData.push( doc.data() )
            } )
            setRoster( rosterData );
        } )

    }, [] )

    const cards = role => {
        const rosterState = [...roster]
        let roleState = rosterState.filter( i => i.role === role )
        const cardList = Object.keys( roleState ).map( key => <PlayerCard key={key} data={roleState[key]} /> )
        return cardList
    }

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

    return (
        <main id="roster">

            <div className="roster-header admin">
                <h1>Roster</h1>
                { props.admin === true && AdminControl() }
            </div>

            <div id="roster-content">

                <h2>Tanks</h2>
                <div className="players-list">
                    { cards( 'tank' ) }
                </div>

                <h2>Healers</h2>
                <div className="players-list">
                    { cards( 'heal' ) }
                </div>

                <h2>Cacs</h2>
                <div className="players-list">
                    { cards( 'cac' ) }
                </div>

                <h2>Ranges</h2>
                <div className="players-list">
                    { cards( 'range' ) }
                </div>

            </div>

        </main>
    );
}

export default Roster