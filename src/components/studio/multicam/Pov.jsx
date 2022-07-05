import { useRef } from 'react'

function Pov(props) {

    let media = useRef()

    return (
        <video ref={media} src={props.pov.lien} className={ Number(props.povId) === Number(props.selected) ? 'active' : 'inactive' } controls>
            <source src={props.pov.lien} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

export default Pov