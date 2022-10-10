import React from "react";

function PopupWithForm(props) {

    return (
        <div className={`popup popup_form_${props.name} ${props.isOpen ? 'popup_opened': ''}`} onMouseDown={props.onCloseClick}>
            <div className="popup__form">
                <button aria-label="Закрыть окно" className="link popup__close" type="button"
                        onClick={props.onClose}>
                </button>
                <form name={props.name} noValidate className="popup__content" onSubmit={props.onSubmit}>
                    <h3 className="popup__title">{props.title}</h3>
                        {props.children}
                    <button className="popup__save" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;