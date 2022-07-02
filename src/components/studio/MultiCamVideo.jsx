import { useRef, useState, useEffect } from 'react';
import { IoPlaySharp } from 'react-icons/io5'

function MultiCamVideo(props) {

    let media = useRef()
    
    
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect( () => {

        media.current.volume = .5

        isPlaying === true ? media.current.play() : media.current.pause()

    }, [isPlaying] )
    
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

            { isPlaying === false ? <Overlay /> : null }

            <video ref={media} onClick={togglePlayPause} controls>
                <source src={props.source[0]} type="video/mp4" />
                <source src={props.source[0]} type="video/ogg" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
}

export default MultiCamVideo