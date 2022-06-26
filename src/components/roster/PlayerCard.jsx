import { IoCloseSharp } from 'react-icons/io5'

import { db } from '../../firebase'

function PlayerCard(props) {

    const deletePlayer = () => {
        const name = props.data.name
        console.log(name);
        db.collection('roster')
            .where('name', '==', name)
            .get()
            .then( result => {
                result.forEach( doc => {
                    doc.ref.delete()
                } )
            } )
    }

    return (
        <div className="player-card-wrapper">

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