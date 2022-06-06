import { useRef, useState } from 'react';
import { IoPlaySharp } from 'react-icons/io5'

function SimpleVideo(props) {

    let media = useRef()

    const [isPlaying, setIsPlaying] = useState(false)

    const play = () => {
        setIsPlaying(true)
        media.current.play()
    }

    const pause = () => {
        setIsPlaying(false)
        media.current.pause()
    }

    const Overlay = () => {
        return(
            <div className="video-overlay" onClick={play}>
                <IoPlaySharp />
            </div>
        )
    }

    return (
        <div className="ratio">

            { isPlaying === false ? <Overlay /> : null }

            <video ref={media} onClick={pause} controls>
                <source src={props.source[0]} type="video/mp4" />
                <source src={props.source[0]} type="video/ogg" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
}

export default SimpleVideo