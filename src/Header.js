import {Link} from "react-router-dom";
import React from "react";
import {ReactComponent as ReactLogo} from './img/logo.svg';

const Header = () => {
    return(
        <header className="header">
            <ReactLogo />

            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
                <li>
                    <Link to={'/login'}>
                        <a className="rbutton">Login</a>
                    </Link>
                </li>
                <li>
                    <Link to={`/projects`}>
                        <a className="rbutton"> Projects</a>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header