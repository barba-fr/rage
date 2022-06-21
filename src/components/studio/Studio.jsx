import React from "react";
import { IoAddCircleSharp } from 'react-icons/io5';

import {db} from "../../firebase";

import AddVideoModal from "../admin/AddVideoModal";

import StudioPost from "./StudioPost";

class Studio extends React.Component {

	state = {

		posts: [],

		addVideoModal: 'closed'

	}

	_isMounted = false

	componentDidMount() {

		this._isMounted = true

		const getPosts = () => {

			let postData = []
			db.collection('studio').onSnapshot( docs => {
				docs.forEach( doc => {
					postData.push( doc.data() )
				} )
				this.setState({ posts: postData })
			} )

		}

		getPosts()

	}

	componentWillUnmount() {
		this._isMounted = false
	}

	adminAddVideo = () => {
		this.setState({
			addVideoModal: 'open'
		})
	}

	closeModal = () => {
		this.setState({ addVideoModal: 'closing' }, () => {
			setTimeout( () => {
				this.setState({ addVideoModal: 'closed' })
			}, 150 )
		})
	}

	AdminControl = (props) => {
		return(
			<div className="admin-controls">
				<IoAddCircleSharp onClick={this.adminAddVideo} />
			</div>
		)
	} 

	render() {

		let posts = [...this.state.posts]
		posts.sort( function(a, b) {
			return b.timestamp - a.timestamp
		}  )
		console.log(posts);
		console.log(Object.keys( posts ).map( key => <StudioPost key={key} data={ posts[key] } /> ));
		posts = Object.keys( posts ).map( key => <StudioPost key={key} data={ posts[key] } /> )

		return (

				<main id="blog">

					<div className="roster-header admin">
						<h1>Studio</h1>
						{ this.props.admin === true && this.AdminControl() }
					</div>

					{ posts }

					{this.state.addVideoModal !== 'closed' ? <AddVideoModal closeModal={this.closeModal} isClosing={ this.state.addVideoModal } /> : null}

				</main>

		);
	}

}

export default Studio;
