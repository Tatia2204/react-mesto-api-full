import React from "react";
import Vector from "../images/Vector.svg";
import { Link } from 'react-router-dom';

function Header({ userEmail, loggedIn, onLogout  }) {

    return (
        <header className="header">
            <img src={Vector} alt="Лого" className="header__logo"/>
            {loggedIn && (
                <div className="header__group">
                    <h2 className="header__email">{userEmail}</h2>
                <Link className="link header__link" to="/sign-in" onClick={() => onLogout()} >Выйти</Link>
                    </div>
            )}
            <Route path="/sign-up">
                <div className="header__group">
                    <Link className="link header__link header__link_register" to="sign-in" >Войти</Link>
                </div>
            </Route>
            <Route path="/sign-in">
                <div className="header__group">
                    <Link className="link header__link header__link_register" to="sign-up" >Регистрация</Link>
                </div>
            </Route>
        </header>
    );
}

export default Header;