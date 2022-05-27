import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5/"
import { IoFilmOutline, IoLogoDiscord } from "react-icons/io5/"

import logo from "../../assets/rage-logo.png";
import hordeLogo from "../../assets/horde-logo.png";
import logsLogo from "../../assets/warcraft-logs-logo.png"

function Header(props) {

    const showForm = () => {
        props.showForm()
    }

    return (
        <div id="header-container">

            <header className="card">

                <div id="header-left">

                    <img src={logo} alt="Logo de le guilde Rage" id="logo-rage" onClick={showForm} />

                    <div id="liens">

                        <p id="slogan">
                            <img src={hordeLogo} alt="Pour la Horde !" id="logo-horde" />
                            <span>
                                Guilde WoW Classic
                            </span>
                        </p>

                    </div>

                </div>

                <p id="description">
                    Rage est une guilde World Of Warcraft fondée en 2009 qui a pour objectif de faire du PvE HL dans une ambiance décontractée, tout en gardant un soucis d'optimisation.
                </p>

            </header>

            <div id="menus">

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <IoHome /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="studio">
                                <IoFilmOutline /> Studio
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div id="external-links">
                    <a href="https://discord.gg/trmyXbv" target="_blank" rel="noopener noreferrer" title="Rejoindre le discord Rage" id="discord-link">
                        <IoLogoDiscord /> Discord
                    </a>

                    <a href="https://classic.warcraftlogs.com/guild/id/479017" target="_blank" rel="noopener noreferrer" title="Logs de la guilde" id="log-link">
                        <img src={logsLogo} alt="" id="logs-logo" /> Logs
                    </a>
                </div>

            </div>

        </div>
    );
}

export default Header