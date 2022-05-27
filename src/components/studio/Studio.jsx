import React from "react";

import Header from '../header/Header'
import LoginForm from "../admin/LoginForm";
import AdminConnected from "../admin/AdminConnected";
import Toast from '../admin/Toast';

import VideoPost from "./VideoPost";

class Studio extends React.Component {

	state = {
		admin: false,

		loginForm: false,

		toast: {
			display: false,
			type: "",
			header: "",
			message: "",
		},

	}

	componentDidMount() {

		const admin = localStorage.getItem('user')
		if (admin) {
			this.setState({ admin: true })
		}

	}

	showForm = () => {
		if (this.state.admin === false) {
			this.setState({ loginForm: true });
		}
	}

	hideForm = () => {
		this.setState({ loginForm: "closing" }, () => {
			setTimeout(() => {
				this.setState({ loginForm: false })
			}, 150);
		});
	}

	confirmLogin = user => {
		localStorage.setItem('user', user);
		this.hideForm();
		this.setState({ admin: true })
		this.sendToast('success', 'Connexion réussie', 'Vous pouvez modifier le site.')
	}

	refuseLogin = errorCode => {

		const errorType = "danger";
		let header = "Erreur", message = "Une Erreur s'est produite.";

		switch (errorCode) {
			case "auth/email-already-in-use":
				message = "Cette adresse e-mail est déjà utilisée.";
				break;

			case "auth/pseudo-not-allowed":
				header = "Compte refusé";
				message = "Vous n'êtes pas éligible à l'administration du site";
				break;

			case "auth/weak-password":
				header = "Mot de passe faible";
				message = "Le mot de passe doit contenit au moins 6 caractères";
				break;

			case "auth/wrong-password":
				message = "Mot de passe incorrect";
				break;

			case "auth/user-not-found":
				message = "Utilisateur introuvable";
				break;

			default:
				break;
		}

		this.sendToast(errorType, header, message);

	}

	logout = () => {
		localStorage.removeItem('user');
		this.setState({ admin: false })
		this.sendToast('success', 'Déconnecté(e)', 'Vous ne pouvez plus faire de modification.')
	}

	sendToast = (type, header, message) => {
		const toast = {
			display: true,
			type: type,
			header: header,
			message: message
		}

		const clearToast = {
			display: false,
			type: "",
			header: "",
			message: ""
		}

		this.setState({ toast }, () => {
			setTimeout(() => {
				this.setState({ toast: clearToast })
			}, 4000);
		})
	}

	render() {

		return (
			<div className="container" id="app">

				{this.state.admin === true ? <AdminConnected logout={this.logout} /> : null}

				<Header showForm={ this.showForm } />

				<main id="blog">

					<div className="roster-header">
						<h1>Studio</h1>
					</div>

					<VideoPost />
					<VideoPost />
					<VideoPost />
					<VideoPost />

				</main>

				{this.state.loginForm !== false ? <LoginForm hideForm={this.hideForm} confirmLogin={this.confirmLogin} refuseLogin={this.refuseLogin} isClosing={this.state.loginForm} /> : null}
				{this.state.toast.display === true ? <Toast type={this.state.toast.type} header={this.state.toast.header} message={this.state.toast.message} /> : null}

			</div>
		);
	}

}

export default Studio;
