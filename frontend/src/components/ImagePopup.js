import React from "react";

function ImagePopup({card, onClose}) {

    return (
        <div className={`popup popup_mask-group ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__group">
                <button aria-label="Закрыть окно" className="link popup__close popup__close_image"
                        type="button" onClick={onClose}></button>
                <form name="formImage" className="popup__content-group">
                    <img src={card.link} alt={card.name} className="popup__mask-image"/>
                    <h2 className="popup__location-name">{card.name}</h2>
                </form>
            </div>
        </div>
    )
}

export default ImagePopup;