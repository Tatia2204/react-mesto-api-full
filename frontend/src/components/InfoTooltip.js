import React from "react";
import success from '../images/success.svg';
import refusal from '../images/refusal.svg';

function InfoTooltip({ isOpen, onClose, isConfirmed }) {

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__form">
                <button aria-label="Закрыть окно" className="link popup__close" type="button"
                        onClick={onClose}>
                </button>
                <form className="popup__content" >
                    <img className="popup__icon" src={isConfirmed ? success : refusal}
                         alt={isConfirmed ? 'Вы успешно зарегистрировались!' : 'Попробуйте ещё раз'} />
                    <h3 className="popup__message">
                        {isConfirmed ? 'Вы успешно зарегистрировались!'
                            : 'Что-то пошло не так! Попробуйте ещё раз.'}
                    </h3>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip;