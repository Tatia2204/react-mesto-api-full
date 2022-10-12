import React, { useState } from 'react';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({
            email: loginData.email,
            password: loginData.password
        });
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
                       value={loginData.email || ''}
                       name="email"
                       className="website__email"
                       onChange={handleChange}
                />
                <input type="password"
                       id="password"
                       required
                       placeholder="Пароль"
                       autoComplete="new-password"
                       value={loginData.password || ''}
                       name="password"
                       className="website__password"
                       onChange={handleChange}
                />
            </form>
            <div className="website__button-container">
                <button type="submit" className="website__link" onClick={handleSubmit} >Войти</button>
            </div>
        </div>
    )
}

export default Login;