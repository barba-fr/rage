import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./header/Header";
import AdminConnected from './admin/AdminConnected'
import LoginForm from "./admin/LoginForm";
import Toast from "./admin/Toast";
import Home from './home/Home'
import Studio from './studio/Studio'
import Post from './studio/Post'
import Roster from "./roster/Roster";

function App() {

	const [admin, setAdmin] = useState(false)
	const [loginForm, setLoginForm] = useState(false)
	const [toast, setToast] = useState({
		display: false,
		type: "",
		header: "",
		message: "",
	})

	useEffect( () => {

		const isAdminStored = localStorage.getItem('user')
		if ( isAdminStored ) {
			setAdmin(true)
		}

	}, [] )

	const showForm = () => {
		if (loginForm === false) {
			setLoginForm(true)
		}
	}

	const hideForm = () => {
		setLoginForm('closing')
		setTimeout( () => {
			setLoginForm(false)
		}, 150 )
	}

	const confirmLogin = user => {
		localStorage.setItem('user', user);
		hideForm();
		setAdmin(true)
		sendToast('success', 'Connexion réussie', 'Vous pouvez modifier le site.')
	}

	const refuseLogin = errorCode => {
		console.log('from app component : ' + errorCode);

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

		sendToast(errorType, header, message);

	}

	const sendToast = (type, header, message) => {
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

		setToast(toast)
		setTimeout( () => {
			setToast(clearToast)
		}, 4000 )

	}

	const logout = () => {
		localStorage.removeItem('user');
		setAdmin(false)
		sendToast('success', 'Déconnecté(e)', 'Vous ne pouvez plus faire de modification.')
	}

	return (
		<div className="App">

			<div className="container" id="app">

				{admin === true ? <AdminConnected logout={logout} /> : null}

				<Header showForm={showForm} />

				<Routes>
					<Route exact path="/" element={<Home admin={admin} />} />
					<Route exact path="studio" element={<Studio admin={admin} />} />
					<Route exact path="studio/video/:id" element={<Post admin={admin} />} />
					<Route exact path="roster" element={<Roster admin={admin} />} />
				</Routes>

				{loginForm !== false && <LoginForm hideForm={hideForm} confirmLogin={confirmLogin} refuseLogin={refuseLogin} isClosing={loginForm} /> }
				{toast.display === true && <Toast type={toast.type} header={toast.header} message={toast.message} /> }

			</div>

		</div>
	);
}

export default App