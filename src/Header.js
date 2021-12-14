import {Link} from "react-router-dom";
import React from "react";
import {ReactComponent as ReactLogo} from './img/logo.svg';

const Header = () => {
    return(
        <header className="header">
            <ReactLogo/>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
                <li>
                    <Link to={'/login'}>
                        <button className="rbutton">Login</button>
                    </Link>
                </li>
                <li>
                    <Link to={`/projects`}>
                        <button className="rbutton"> Projects</button>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header