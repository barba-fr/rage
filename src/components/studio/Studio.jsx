import React from "react";

import logo from "../../assets/rage-logo.png";
import hordeLogo from "../../assets/horde-logo.png";
import {IoLogoDiscord} from "react-icons/io5";
import logsLogo from "../../assets/warcraft-logs-logo.png"

import LoginForm from "../admin/LoginForm";
import AdminConnected from "../admin/AdminConnected";
import Toast from '../admin/Toast';

class Home extends React.Component {

  state = {
    admin: false,

    loginForm : false,

    toast: {
      display: false,
      type: "",
      header: "",
      message: "",
    },

    raidList: {
      gruul : {
        raidName: "Repaire de Gruul",
        bossTotal: 2
      },
      magtheridon : {
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

    bloodrage : {
      recruitment : {},
    },

    stormrage : {
      recruitment : {},
    },

    recruitModal: {
      open: false,
      roster: ""
    }

  }

  componentDidMount(){

    const admin = localStorage.getItem('user')
    if (admin) {
      this.setState({ admin: true })
    }

  }

  showForm = () => {
    if ( this.state.admin === false ) {
      this.setState({ loginForm: true });
    }
  }

  hideForm = () => {
    this.setState({ loginForm: "closing" }, () => {
      setTimeout( () => {
        this.setState({ loginForm: false })
      }, 150 );
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

    switch ( errorCode ) {
      case "auth/email-already-in-use" :
        message = "Cette adresse e-mail est déjà utilisée.";        
        break;

      case "auth/pseudo-not-allowed" :
        header = "Compte refusé";
        message = "Vous n'êtes pas éligible à l'administration du site";
        break;

      case "auth/weak-password" :
        header = "Mot de passe faible";
        message = "Le mot de passe doit contenit au moins 6 caractères";
        break;

      case "auth/wrong-password" :
        message = "Mot de passe incorrect";
        break;

      case "auth/user-not-found" :
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
      header : header,
      message: message
    }

    const clearToast = {
      display: false,
      type: "",
      header: "",
      message: ""
    }

    this.setState({ toast }, () => {
      setTimeout( () => {
        this.setState({ toast: clearToast })
      }, 4000 );
    })
  }

  showClassEditor = (roster, wowClass) => {
  
    if ( this.state.admin === true ) {
      const classEditor = {
        open: true,
        roster : roster,
        wowClass: wowClass
      }
      this.setState({ classEditor })
    }

  }

  closeClassEditor = () => {

    let classEditor = {...this.state.classEditor}
    classEditor.open = "closing";

    this.setState({ classEditor }, () => {
      setTimeout( () => {
        classEditor = {
          open: false,
          roster : "",
          wowClass: "",
        }
        this.setState({ classEditor })
      }, 150 );
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

    let recruitModal = {...this.state.recruitModal}
    recruitModal.open = "closing";

    this.setState({ recruitModal }, () => {
      
      setTimeout( () => {
        recruitModal = {
          open: false,
          roster: "",
        }
        this.setState({ recruitModal })
      }, 200 );

    })

  }

  render() {

    return (
      <div className="container" id="app">

        { this.state.admin === true ? <AdminConnected logout={this.logout}/> : null }
        
        <header className="card">

          <div id="header-left">

            <img src={logo} alt="Logo de le guilde Rage" id="logo-rage" onClick={this.showForm}/>

            <div id="liens">

              <p id="slogan">
                <img src={hordeLogo} alt="Pour la Horde !" id="logo-horde" />
                <span>
                  Guilde WoW Classic
                </span>
              </p>

              <a href="https://discord.gg/trmyXbv" target="_blank" rel="noopener noreferrer" title="Rejoindre le discord Rage" id="discord-link">
                <IoLogoDiscord /> Discord
              </a>

              <a href="https://classic.warcraftlogs.com/guild/id/479017" target="_blank" rel="noopener noreferrer" title="Logs de la guilde" id="log-link">
                <img src={logsLogo} alt="" id="logs-logo" /> Logs
              </a>

            </div>

          </div>

          <p id="description">
            Rage est une guilde World Of Warcraft fondée en 2009 qui a pour objectif de faire du PvE HL dans une ambiance décontractée, tout en gardant un soucis d'optimisation.
          </p>

        </header>

        <main id="rosters">

        </main>

        { this.state.loginForm !== false ?      <LoginForm hideForm={this.hideForm} confirmLogin={this.confirmLogin} refuseLogin={this.refuseLogin} isClosing={this.state.loginForm} /> : null }
        { this.state.toast.display === true ?   <Toast type={this.state.toast.type} header={this.state.toast.header} message={this.state.toast.message} /> : null  }
        
      </div>
    );
  }
  
}

export default Home;
