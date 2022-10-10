import React from "react";
import success from '../images/success.svg';
import refusal from '../images/refusal.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
            <div className="popup__form">
                <button aria-label="Закрыть окно" className="link popup__close" type="button"
                        onClick={props.onClose}>
                </button>
                <form className="popup__content" >
                    <img className="popup__icon" src={props.isConfirmed ? success : refusal}
                         alt={props.isConfirmed ? 'Вы успешно зарегистрировались!' : 'Попробуйте ещё раз'} />
                    <h3 className="popup__message">
                        {props.isConfirmed ? 'Вы успешно зарегистрировались!'
                            : 'Что-то пошло не так! Попробуйте ещё раз.'}
                    </h3>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip;