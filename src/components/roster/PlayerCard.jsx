import { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

import { db } from '../../firebase'

function PlayerCard(props) {

    const [deleting, setDeleting] = useState('')

    const deletePlayer = () => {
        const name = props.data.name

        setDeleting('deleting') 

        setTimeout( () => {
            db.collection('roster')
                .where('name', '==', name)
                .get()
                .then( result => {
                    result.forEach( doc => {
                        doc.ref.delete()
                    } )
                } )
                .then(() => {
                    setDeleting('deleted')
                })
        }, 250 )
    }

    return (
        <div className={`player-card-wrapper ${ deleting }`}>

            <div className="card player-card">

                { props.admin && <IoCloseSharp className='delete-player' onClick={deletePlayer} /> }

                <div className="class-icon">
                    <img src={require(`../../assets/class-icons/${ props.data.class }.png`).default} alt="druid icon" />
                </div>
                <div className="card-player-body">
                    <h3 className="player-name">{ props.data.name }</h3>
                    <p className="player-spe">{ props.data.spe }</p>
                </div>
            </div>

        </div>
    );
}

export default PlayerCard