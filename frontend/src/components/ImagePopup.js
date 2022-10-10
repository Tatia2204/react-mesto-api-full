import React from "react";

function ImagePopup(props) {

    return (
        <div className={`popup popup_mask-group ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
            <div className="popup__group">
                <button aria-label="Закрыть окно" className="link popup__close popup__close_image"
                        type="button" onClick={props.onClose}></button>
                <form name="formImage" className="popup__content-group">
                    <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} className="popup__mask-image"/>
                    <h2 className="popup__location-name">{props.card ? props.card.name : ''}</h2>
                </form>
            </div>
        </div>
    )
}

export default ImagePopup;