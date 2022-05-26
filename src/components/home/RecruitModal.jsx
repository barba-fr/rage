import React from 'react';
import { IoLogoDiscord, IoClose } from 'react-icons/io5';

class RecruitModal extends React.Component {

    closeRecrutModal = e => {
        this.props.closeRecrutModal(e);
    }

    stopPropagation = e => {
        e.stopPropagation();
    }

    rosterSpec = {
        raidDays : {
            bloodrage: "le mercredi et dimanche, ainsi que le lundi pour les phases de progress (de 20h30 à minuit)",
            stormrage: "le mercredi, dimanche et lundi (de 20h30 à minuit)",
        }
    }

    render(){
        return (
            <div className={`overlay recrut-modal ${this.props.isClosing}`} id={`recrut-modal-${this.props.roster}`} onClick={this.closeRecrutModal}>
                <div className="box" id="recrut-box" onClick={this.stopPropagation}>
                    
                    <div className="recrut-modal-header">
                        <IoClose id="close-recrut-modal" onClick={this.closeRecrutModal} />
                        <h2>Postuler</h2>
                    </div>

                    <div className="recrut-modal-body">

                        <div className="content" id="pre-requis">
                            <h3>Les pré-requis</h3>

                            <ul>
                                <li>
                                    <p> Notre roster raid principalement {this.rosterSpec.raidDays[this.props.roster]} .</p>

                                </li>
                                <li>
                                    <p>Nous attendons de nos joueurs une présence en raid régulière afin de garantir la stabilité du roster.</p>

                                </li>
                                <li>
                                    <p>La maitrise de votre classe, l'optimisation de votre stuff et l'utilisation des consos en raid sont également requis.</p>
                                </li>
                            </ul>

                        </div>

                        <div className="content" id="comment-postuler">
                            <h3>Comment postuler ?</h3>

                            <ul>
                                <li>
                                    <p>Rejoignez notre serveur Discord et consultez le message épinglé dans le canal recrutement.</p>
                                </li>
                                <li>
                                    <p>Préparez votre candidature selon les instructions du message épinglé, puis envoyez-la sur le canal #recrutement ou par message privé à Shru#0001.</p>
                                </li>
                            </ul>
                            <a href="https://discord.gg/trmyXbv" className="button" target="_blank" rel="noreferrer">
                                <IoLogoDiscord /> Rejoindre Discord
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default RecruitModal