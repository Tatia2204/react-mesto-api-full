import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState( {
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onRegister(registerData);
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
                           value={registerData.email}
                           name="email"
                           className="website__email"
                           onChange={handleChange}
                    />
                </label>
                <label className="website__indent">
                    <input type="password"
                           id="password"
                           required
                           placeholder="Пароль"
                           autoComplete="new-password"
                           value={registerData.password}
                           name="password"
                           className="website__password"
                           onChange={handleChange}
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