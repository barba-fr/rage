import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SimpleVideo from './SimpleVideo'

import {db} from "../../firebase";

function Post(props) {

    const [post, setPost] = useState({})

    const params = useParams()
    const id = params.id

    useEffect(() => {
        
        db.collection('studio').where('timestamp', '==', Number(id)).get()
            .then( docs => {
                docs.forEach( doc => {
                    setPost(doc.data())
                } )
            } )

    }, [id])

    return (

        <main id="rosters">

            <div className="post card">

                <div className="post-header roster-header">
                    <h1>{ post.titre }</h1>
                    <p>{ post.auteur }, le {post.date}</p>
                </div>

                <div className="post-content">
                    { post.source && post.source.length === 1 ? <SimpleVideo source={post.source} /> : null}
                </div>

            </div>

        </main>

    );

}

export default Post;
