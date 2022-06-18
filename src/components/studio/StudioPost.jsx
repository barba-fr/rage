import { IoPlaySharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function StudioPost(props) {
    return (
        <div className="studio-post card">
            <div className="studio-post-header">
                <h2>{ props.data.titre }</h2>
                <p><span className="auteur">{ props.data.auteur }</span>, le <span className="date">{ props.data.date }</span></p>
            </div>
            <div className="studio-post-action">
                <Link to={ '/studio/video/' + props.data.timestamp } title="Voir cette vidéo">
                    <IoPlaySharp />
                </Link>
            </div>
        </div>
    );
}

export default StudioPost