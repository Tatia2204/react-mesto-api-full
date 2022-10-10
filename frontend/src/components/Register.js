import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleMailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onRegister(email, password);
    }

    return (
        <div className="website" >
            <form className="website__form" >
                <h1 className="website__title">Регистрация</h1>
                <label className="website__indent">
                    <input type="email"
                           id="email"
                           required
                           placeholder="Email"
                           autoComplete="email"
                           value={email}
                           name="email"
                           className="website__email"
                           onChange={handleMailInput}
                    />
                </label>
                <label className="website__indent">
                    <input type="password"
                           id="password"
                           required
                           placeholder="Пароль"
                           autoComplete="new-password"
                           value={password}
                           name="password"
                           className="website__password"
                           onChange={handlePasswordInput}
                    />
                </label>
            </form>
            <div className="website__button-container">
                <button type="submit" className="website__link" onClick={handleSubmit} >Зарегистрироваться</button>
                <Link className="link website__logout" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </div>
        </div>
    )
}

export default Register;