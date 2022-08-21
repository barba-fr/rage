import { useState } from 'react'

function PovSelector(props) {

    const [switching, setSwitching] = useState(false)

    const selected = props.selected === true ? 'selected' : 'not-selected'

    const isSelected = () => {
        setSwitching(true)
        setTimeout( () => {
            setSwitching(false)
        }, 1000 )
        props.isSelected(props.povId);
    }

    return (
        <div className={`player-card-wrapper ${selected}`} onClick={isSelected}>

            <div className={ switching === true ? 'pov-loader switching' : 'pov-loader' } />

            <div className="card player-card">

                <div className="class-icon">
                    <img 
                        src={require(`../../../assets/class-icons/${ props.data.class }.png`).default} 
                        alt={props.data.class + ' icon'} 
                    />
                </div>
                <div className="card-player-body">
                    <h3 className="player-name">{ props.data.name }</h3>
                    <p className="player-spe">{ props.data.spe }</p>
                </div>
            </div>

        </div>
    );
}

export default PovSelector