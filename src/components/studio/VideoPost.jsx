import { IoPlay } from 'react-icons/io5'

function VideoPost(props) {
    return (
        <div className="video-post">

            <div className="post-header">

                <h2 className="post-title">
                    brutallus & felmyst
                </h2>

                <div className="post-meta">
                    <span className="post-author">Gendalph</span>, <span className="post-date">17 mai 2022</span>
                </div>

            </div>

            <div className="post-content card">

                <div className="post-thumbnail">
                    <IoPlay />
                </div>

            </div>

        </div>
    );
}

export default VideoPost