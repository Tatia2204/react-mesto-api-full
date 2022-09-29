import React from "react";

function PopupWithForm({isOpen, popup, onClose, name, children, text, title, onSubmit}) {

    const popupIsOpen = isOpen ? 'popup_opened' : '';
    return (
        <div className={`popup popup_${popup} ${popupIsOpen}`}>
            <div className="popup__form">
                <button aria-label="Закрыть окно" className="link popup__close" type="button"
                        onClick={onClose}>
                </button>
                <form name={name} noValidate className="popup__content" onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                        {children}
                    <button className="popup__save" type="submit">{text}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;