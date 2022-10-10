import React, { useState } from 'react';

function Login(props) {
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

        props.onLogin(email, password);
    }

    return (
        <div className="website">
            <form className="website__form" >
                <h1 className="website__title">Вход</h1>
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
            </form>
            <div className="website__button-container">
                <button type="submit" className="website__link" onClick={handleSubmit}>Войти</button>
            </div>
        </div>
    )
}

export default Login;