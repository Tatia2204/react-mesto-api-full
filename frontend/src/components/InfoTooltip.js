import React from "react";

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
            <div className="popup__form">
                <button aria-label="Закрыть окно" className="link popup__close" type="button"
                        onClick={props.onClose}>
                </button>
                <form className="popup__content" >
                    <img className="popup__icon" {props.image} alt={props.title} />
                    <h3 className="popup__message">{props.title}</h3>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip;