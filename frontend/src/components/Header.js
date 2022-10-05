import React from "react";
import Vector from "../images/Vector.svg";
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, loggedIn, onLogout, onRegister  }) {
    const location = useLocation();
    return (
        <header className="header">
            <img src={Vector} alt="Лого" className="header__logo"/>
                {location.pathname === "/" ? (
                    <div className="header__group">
                        <h2 className="header__email">{userEmail}</h2>
                        <Link className="link header__link" to="/sign-in" onClick={onLogout} >Выйти</Link>
                    </div>
                    ) : null}
                {location.pathname === "/signup" ? (
                    <div className="header__group">
                        <Link className="link header__link header__link_register" to="sign-in" loggedIn={loggedIn}>Войти</Link>
                    </div>
                     ) : null}
                {location.pathname === "/signin" ? (
                    <div className="header__group">
                        <Link className="link header__link header__link_register" to="sign-up" onRegister={onRegister}>Регистрация</Link>
                    </div>
                    ) : null}
        </header>
    );
}

export default Header;