import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { IoPlaySharp, IoExpandSharp } from 'react-icons/io5'

import { db } from '../../../firebase'

import Pov from './Pov';
import PlayerSelect from './PlayerSelect';

function MultiCamVideo(props) {
    
    const params = useParams()

    const [camsData, setCamsData] = useState('')
    const [selector, setSelector] = useState([])
    const [selected, setSelected] = useState(0)
    
    useEffect( () => {

        let _isMounted = true

        const id = params.id
        
        // Get video data
        db.collection('studio').where( 'timestamp', '==', Number(id) ).get()
        .then( docs => {
                docs.forEach( doc => {

                    const cams = doc.data().source
                    if ( _isMounted === true ) {
                        setCamsData( cams );
                        setSelector( doc.data().source )
                    }
                    
                    const newSelector = []
                    cams.forEach( cam => {
                        db.collection('roster').where('name', '==', cam.auteur).get()
                        .then( players => {
                            players.forEach( player => {
                                    newSelector.push( player.data() )
                                    if ( _isMounted === true ) {
                                        setSelector( newSelector )
                                    }
                                } )
                            } )
                    } )

                } )
            } )
                  
            return () => ( _isMounted = false )

    }, [params.id] )

    const povs = () => {
        return Object.keys(camsData).map(key => 
            <Pov 
                key={key} 
                pov={camsData[key]} 
                povId={key}
                selected={selected}
            /> 
        )
    }

    const showSelectors = () => {

        return Object.keys(selector).map( key => 
            <PlayerSelect 
                key={key} 
                data={selector[key].auteur} 
                povId={key}
                selected={selected}
                isSelected={isSelected}
            /> )
        
    }

    const isSelected = number => {
        setSelected( Number(number) )
    }

    return (
        <div className="ratio">

            { povs() }

            <div id="multicam-controls">

                <div id="multicam-selection">
                    { showSelectors() }
                </div>

                <div id="multicam-buttons">
                    <IoPlaySharp />
                    <IoExpandSharp />
                </div>

            </div>

        </div>
    );
}

export default MultiCamVideo