import SimpleVideo from './SimpleVideo';

function VideoPost(props) {

    return (
        <div className="video-post">

            <div className="post-header">

                <h2 className="post-title">
                    { props.data.titre }
                </h2>

                <div className="post-meta">
                    <span className="post-author">{ props.data.auteur }</span>, <span className="post-date">{ props.data.date }</span>
                </div>

            </div>

            <div className="post-content card">

                { 
                    props.data.source.length === 1 
                        ? <SimpleVideo source={ props.data.source[0] } /> 
                        : null 
                }

            </div>

        </div>
    );
}

export default VideoPost