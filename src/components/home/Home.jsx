import React from "react";

import Header from '../header/Header'
import ClassStatus from './ClassStatus';
import RaidProgress from "./RaidProgress";
import LoginForm from "../admin/LoginForm";
import AdminConnected from "../admin/AdminConnected";
import Toast from '../admin/Toast';
import ClassEditor from "../admin/ClassEditor";

import spe from '../../spe';
import RecruitButton from "./RecruitButton";
import RecruitModal from "./RecruitModal";

class Home extends React.Component {

	state = {
		admin: false,

		loginForm: false,

		classEditor: {
			open: false,
			roster: "bloodrage",
			wowClass: "shaman",
		},

		toast: {
			display: false,
			type: "",
			header: "",
			message: "",
		},

		raidList: {
			gruul: {
				raidName: "Repaire de Gruul",
				bossTotal: 2
			},
			magtheridon: {
				raidName: "Repaire de Magtheridon",
				bossTotal: 1
			},
			kara: {
				raidName: "Karazhan",
				bossTotal: 12,
			},
			ssc: {
				raidName: "Caverne du Sanctuaire du Serpent",
				bossTotal: 6,
			},
			eye: {
				raidName: 'Donjon de la Tempête',
				bossTotal: 4,
			},
			hyjal: {
				raidName: 'Sommet d\'Hyjal',
				bossTotal: 5,
			},
			bt: {
				raidName: "Temple Noir",
				bossTotal: 9,
			},
			za: {
				raidName: "Zul'Aman",
				bossTotal: 6,
			},
			sunwell: {
				raidName: "Plateau du Puits du Soleil",
				bossTotal: 6,
			}
		},

		bloodrage: {
			recruitment: {},
		},

		stormrage: {
			recruitment: {},
		},

		recruitModal: {
			open: false,
			roster: ""
		}

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

	showClassEditor = (roster, wowClass) => {

		if (this.state.admin === true) {
			const classEditor = {
				open: true,
				roster: roster,
				wowClass: wowClass
			}
			this.setState({ classEditor })
		}

	}

	closeClassEditor = () => {

		let classEditor = { ...this.state.classEditor }
		classEditor.open = "closing";

		this.setState({ classEditor }, () => {
			setTimeout(() => {
				classEditor = {
					open: false,
					roster: "",
					wowClass: "",
				}
				this.setState({ classEditor })
			}, 150);
		});

	}

	openRecruitModal = roster => {
		let recruitModal = {
			open: true,
			roster
		}
		this.setState({ recruitModal })
	}

	closeRecrutModal = () => {

		let recruitModal = { ...this.state.recruitModal }
		recruitModal.open = "closing";

		this.setState({ recruitModal }, () => {

			setTimeout(() => {
				recruitModal = {
					open: false,
					roster: "",
				}
				this.setState({ recruitModal })
			}, 200);

		})

	}

	render() {

		// BLOODRAGE RECRUITEMENT
		const bloodrageClassStatus = Object.keys(spe).map(key =>
			<ClassStatus
				key={`bloodrage_${key}`}
				roster="bloodrage"
				wowClass={key}
				admin={this.state.admin}
				showClassEditor={this.showClassEditor}
			/>
		);

		// BLOODRAGE PROGRESS
		let bloodrageProgress = Object.keys(this.state.raidList).map(
			key =>
				<RaidProgress
					key={`bloodrage_${key}`}
					admin={this.state.admin}
					roster="bloodrage"
					raidId={key}
					metaData={this.state.raidList[key]}
				/>
		);

		return (
			<div className="container" id="app">

				{this.state.admin === true ? <AdminConnected logout={this.logout} /> : null}

				<Header showForm={this.showForm} />

				<main id="rosters">

					<section className="roster" id="bloodrage">

						<div className="card">

							<div className="roster-header">
								<h2>Recrutement</h2>
								<RecruitButton roster="bloodrage" openRecruitModal={this.openRecruitModal} />
							</div>

							<div className="recruitment">

								<div className="recruitment-body">
									{bloodrageClassStatus}
								</div>

							</div>

						</div>
						{/* end recruitment card */}

						<div className="card">

							<div className="progress-header">
								<h2>Progress</h2>
							</div>

							<div className="progress-body">
								{bloodrageProgress}
							</div>

						</div>
						{/* end progress card */}

					</section>
					{/* end Bloodrage */}

				</main>

				{this.state.loginForm !== false ? <LoginForm hideForm={this.hideForm} confirmLogin={this.confirmLogin} refuseLogin={this.refuseLogin} isClosing={this.state.loginForm} /> : null}
				{this.state.toast.display === true ? <Toast type={this.state.toast.type} header={this.state.toast.header} message={this.state.toast.message} /> : null}
				{this.state.admin === true && this.state.classEditor.open !== false ? <ClassEditor data={this.state.classEditor} closeClassEditor={this.closeClassEditor} isClosing={this.state.classEditor.open} /> : null}
				{this.state.recruitModal.open !== false ? <RecruitModal roster={this.state.recruitModal.roster} closeRecrutModal={this.closeRecrutModal} isClosing={this.state.recruitModal.open} /> : null}

			</div>
		);
	}

}

export default Home;
