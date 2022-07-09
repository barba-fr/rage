import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { IoPlaySharp, IoExpandSharp, IoContractSharp, IoReorderTwoSharp } from 'react-icons/io5'

import { db } from '../../../firebase'

import Pov from './Pov';
import PlayerSelect from './PlayerSelect';

function MultiCamVideo(props) {

    const fullscreen = useRef()
    
    const params = useParams()

    const [camsData, setCamsData] = useState('')
    const [selector, setSelector] = useState([])
    const [selected, setSelected] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    
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

    const Overlay = () => {
        return(
            <div className="video-overlay" onClick={() => setIsPlaying(true)}>
                <IoPlaySharp />
            </div>
        )
    }

    const povs = () => {
        return Object.keys(camsData).map(key => 
            <Pov 
                key={key} 
                pov={camsData[key]} 
                povId={key}
                selected={selected}
                isPlaying={isPlaying}
                isFullScreen={fullScreen}
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
            /> 
        )
    }

    const isSelected = number => {
        setSelected( Number(number) )
    }

    const togglePlayPause = () => {
        setIsPlaying( !isPlaying )
    }

    const toggleFullScreen = () => {
        if ( fullScreen === false ) {
            fullscreen.current.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
        setFullScreen( !fullScreen )
    }

    return (
        <div ref={fullscreen} className={`ratio ${ fullScreen === true ? 'full-screen' : 'no-full-screen' }`}>

            { isPlaying === false ? <Overlay onClick={togglePlayPause} /> : null }

            { povs() }

            <div id="multicam-controls">

                <div className={`grabber`}>
                    <div className="grabber-content">
                        <IoReorderTwoSharp />
                    </div>
                </div>

                <div id="multicam-selection">
                    { showSelectors() }
                </div>

                <div id="multicam-buttons">
                    <IoPlaySharp onClick={togglePlayPause} />
                    { fullScreen === false ? <IoExpandSharp onClick={toggleFullScreen} /> : <IoContractSharp onClick={toggleFullScreen} /> }    
                </div>

            </div>

        </div>
    );
}

export default MultiCamVideo