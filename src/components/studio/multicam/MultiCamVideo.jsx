import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebase'

import {    IoPlaySharp, 
            IoPauseSharp, 
            IoExpandSharp, 
            IoContractSharp,
            IoVolumeMediumSharp,
            IoEllipsisHorizontalSharp } from 'react-icons/io5'

import PovSelector from './PovSelector'
import Pov from './Pov'

function MultiCamVideo(props) {

    const audio = useRef()
    const wrapper = useRef()
    const params = useParams()

    /* DATA */
    const [videoData, setVideoData] = useState({})
    const [povSources, setPovSources] = useState([])

    /* CHANGE POV SELECTION */
    const [selected, setSelected] = useState(1)
    const [nextSelected, setNextSelected] = useState(1)

    /* MEDIA CONTROL */
    const [isPlaying, setIsPlaying] = useState( false )
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [mediaVolume, setMediaVolume] = useState( 50 )
    const [time, setTime] = useState( 0 )

    useEffect( () => {
        
        /* DATA */
        db.collection('studio').where('timestamp', '==', Number(params.id)).get()
            .then( docs => {

                docs.forEach( doc => {
                    setVideoData( doc.data() )
                    setPovSources( doc.data().source )
                } )

            } )

        /* MEDIA CONTROL */
        if ( isPlaying === true ) {
            audio.current.play()
        } else {
            audio.current.pause()
        }

        const rageMediaVolume = localStorage.getItem('rageMediaVolume')
        if ( rageMediaVolume ) {
            audio.current.volume = rageMediaVolume
            setMediaVolume( Number( rageMediaVolume ) * 100 )
        } else {
            audio.current.volume = .5
            localStorage.setItem('rageMediaVolume', .5)
            setMediaVolume( 50 )
        }

    }, [isPlaying, params.id] )

    /* MEDIA CONTROL */
    const togglePlayPause = () => {
        setTime( audio.current.currentTime )
        setIsPlaying( !isPlaying )
    }

    const toggleFullScreen = () => {
        if ( !document.fullscreenElement ) {
            wrapper.current.requestFullscreen()
            setIsFullScreen( true )
        } else {
            document.exitFullscreen()
            setIsFullScreen( false )
        }
    }

    const setVolume = e => {
        const bounds = e.target.getBoundingClientRect()
        const x = e.clientX - bounds.left;
        setMediaVolume( x )
        localStorage.setItem('rageMediaVolume', x/100)
        audio.current.volume = x/100
    }

    /* CHANGE POV SELECTION */
    const isSelected = id => {
        setTime( audio.current.currentTime )
        setNextSelected( Number(id) )
        setTimeout( () => {
            setSelected( Number(id) )
        }, 1000 )
    }

    /* COMPONENTS RENDER */
    const renderPovSelector = () => {
        return Object.keys(povSources).map( key => 
            <PovSelector 
                key={key} 
                data={povSources[key].auteur} 
                selected={ Number(key) + 1 === selected && true  } 
                povId={ Number(key) + 1 } 
                isSelected={isSelected}
            />
        )
    }

    const renderMediaPlayer = () => {
        return Object.keys(povSources).map( key => 
            <Pov
                key={key}
                pov={ povSources[key] }
                povId={ Number(key) + 1 } 
                isPlaying={ isPlaying }
                selected={ Number(key) + 1 === selected && true  } 
                nextSelected={ Number(key) + 1 === nextSelected && true }
                time={ time }
            />    
        )
    }

    return (
        <div id="multicam">

            <div id="pov-wrapper" ref={wrapper}>

                <audio ref={audio} src={videoData.son} name="media" controls id="multicam-audio" />

                <div className="ratio">
                    { renderMediaPlayer() }
                </div>
            
                <div id="multicam-controls">

                    <div id="handler">                        
                        <IoEllipsisHorizontalSharp />
                    </div>

                    <div id="media-controls">
                        { isPlaying === true ? <IoPauseSharp onClick={togglePlayPause} /> : <IoPlaySharp onClick={togglePlayPause} /> }
                        { isFullScreen === true ? <IoContractSharp onClick={toggleFullScreen} /> : <IoExpandSharp onClick={toggleFullScreen} /> }
                        <div id="volume">

                            <IoVolumeMediumSharp />

                            <div id="volume-bar-container" onClick={setVolume}>
                                <div id="volume-bar" style={{ width : mediaVolume + '%' }} />
                            </div>

                        </div>
                    </div>

                    <div id="pov-controls">

                        { renderPovSelector() }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MultiCamVideo