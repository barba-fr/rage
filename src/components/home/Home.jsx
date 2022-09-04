import React from "react";

import ClassStatus from './ClassStatus';
import RaidProgress from "./RaidProgress";
import ClassEditor from "../admin/ClassEditor";

import spe from '../../spe';
import RecruitButton from "./RecruitButton";
import RecruitModal from "./RecruitModal";

class Home extends React.Component {

	state = {

		classEditor: {
			open: false,
			roster: "bloodrage",
			wowClass: "shaman",
		},

		raidList: {
			naxxramaslk: {
				raidName: "Naxxramas",
				bossTotal: 15
			},
			eyeeternity: {
				raidName: "L'oeil de l'éternité",
				bossTotal: 1
			},
			obsidien: {
				raidName: "Sanctum Obsidien",
				bossTotal: 1,
			},
			ulduar: {
				raidName: "Ulduar",
				bossTotal: 14,
			},
			croise: {
				raidName: 'L\'épreuve du croisé',
				bossTotal: 5,
			},
			onyxialk: {
				raidName: 'Le repaire d\'Onyxia',
				bossTotal: 1,
			},
			icc: {
				raidName: "Citadelle de la Couronne de Glace",
				bossTotal: 12,
			},
			rubis: {
				raidName: "Sanctum Rubis",
				bossTotal: 1,
			},
		},

		bloodrage: {
			recruitment: {},
		},

		recruitModal: {
			open: false,
			roster: ""
		}

	}

	showClassEditor = (roster, wowClass) => {

		console.log(roster, wowClass);

		if (this.props.admin === true) {
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
				admin={this.props.admin}
				showClassEditor={this.showClassEditor}
			/>
		);

		// BLOODRAGE PROGRESS
		let bloodrageProgress = Object.keys(this.state.raidList).map(
			key =>
				<RaidProgress
					key={`bloodrage_${key}`}
					admin={this.props.admin}
					roster="bloodrage"
					raidId={key}
					metaData={this.state.raidList[key]}
				/>
		);

		return (
	
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

				{this.props.admin === true && this.state.classEditor.open !== false ? <ClassEditor data={this.state.classEditor} closeClassEditor={this.closeClassEditor} isClosing={this.state.classEditor.open} /> : null}
				{this.state.recruitModal.open !== false ? <RecruitModal roster={this.state.recruitModal.roster} closeRecrutModal={this.closeRecrutModal} isClosing={this.state.recruitModal.open} /> : null}
			
			</main>

		);
	}

}

export default Home;
