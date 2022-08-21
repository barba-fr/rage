import { IoPlaySharp, IoVideocamSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function StudioPostMultiCam(props) {
    return (
        <div className="studio-post multi card">
            <div className="studio-post-header">
                <h2>
                    <Link to={ '/studio/video/' + props.data.timestamp } title="Voir cette vidéo">
                        <IoVideocamSharp /> { props.data.titre }
                    </Link>
                </h2>
                <p>Le <span className="date">{ props.data.date }</span></p>
            </div>
            <div className="studio-post-action">
                <Link to={ '/studio/video/' + props.data.timestamp } title="Voir cette vidéo">
                    <IoPlaySharp />
                </Link>
            </div>
        </div>
    );
}

export default StudioPostMultiCam