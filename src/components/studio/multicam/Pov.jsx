import { useRef, useEffect } from 'react'

function Pov(props) {

    let media = useRef()

    useEffect( () => {

        media.current.volume = 0
        if ( props.isPlaying === true && props.nextSelected === true ) {
            media.current.currentTime = props.time
            media.current.play()
        } else if ( props.isPlaying === true && props.selected === true ) {
            media.current.play()
        } else {
            media.current.pause()
        }

    } )

    return (
        <video 
            ref={media} 
            src={props.pov.lien}
            preload="auto"
            className={ props.selected === true ? 'active' : 'inactive' }
        >
            <source src={props.pov.lien} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

export default Pov