import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5/"
import { IoFilmOutline, IoLogoDiscord, IoMenuSharp } from "react-icons/io5/"

import logo from "../../assets/rage-logo.png";
// import hordeLogo from "../../assets/horde-logo.png";
import logsLogo from "../../assets/warcraft-logs-logo.png"
import { useState } from "react";

function Header(props) {

    const [menu, setMenu] = useState('closed')

    const showForm = () => {
        props.showForm()
    }

    const toggleMenu = () => {
        if ( menu === 'closed' ) {

            setMenu('opening')
            setTimeout( () => {
                setMenu('open')
            }, 15 )

        } else if ( menu === 'open' ) {

            setMenu('closing')
            setTimeout( () => {
                setMenu('closed')
            }, 150 )

        }
    }

    return (

        <header>

            <div id="logo">
                <img src={logo} alt="Logo de le guilde Rage" id="logo-rage" onClick={showForm} />
                <p id="slogan">
                    {/* <img src={hordeLogo} alt="Pour la Horde !" id="logo-horde" /> */}
                    Guilde WoW Classic - Auberdine - Horde
                </p>
            </div>


            <div className={menu} id="responsive-menus">
                
                <div id="burger-icon" onClick={toggleMenu}>
                    <IoMenuSharp />
                </div>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" onClick={toggleMenu}>
                                <IoHome /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/studio" onClick={toggleMenu}>
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
            
            <div className={menu} id="menus-overlay"></div>
      
        </header>
    );
}

export default Header