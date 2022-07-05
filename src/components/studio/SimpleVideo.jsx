import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { IoPlaySharp } from 'react-icons/io5'

import { db } from '../../firebase'

function SimpleVideo(props) {

    let media = useRef()
    
    const params = useParams()
    const [source, setSource] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    
    useEffect( () => {
        let _isMounted = true

        media.current.addEventListener('volumechange', e => {
            localStorage.setItem('rageMediaVolume', media.current.volume)
        })

        const rageMediaVolume = localStorage.getItem('rageMediaVolume')
        if ( rageMediaVolume ) {
            media.current.volume = rageMediaVolume
        } else {
            media.current.volume = .5
            localStorage.setItem('rageMediaVolume', .5)
        }

        isPlaying === true ? media.current.play() : media.current.pause()

        const id = params.id

        db.collection('studio').where('timestamp', '==', Number(id)).get()
            .then( docs => {
                if ( _isMounted === true ) {

                    docs.forEach( doc => {
                        setSource( doc.data().source )
                    } )
                    
                }
            } )

        return () => {
            _isMounted = false
        }

    } )
    
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const Overlay = () => {
        return(
            <div className="video-overlay" onClick={togglePlayPause}>
                <IoPlaySharp />
            </div>
        )
    }

    return (
        <div className="ratio">

            { isPlaying === false ? <Overlay onClick={togglePlayPause} /> : null }

            <video ref={media} src={source} controls onClick={togglePlayPause}>
                <source src={source} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
}

export default SimpleVideo