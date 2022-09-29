import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarLink = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarLink.current.value,
        });
    }

    React.useEffect(() => {
        avatarLink.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            popup="avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="formAvatar"
            title="Обновить аватар"
            text="Сохранить"
        >
            <label className="popup__indent">
                <input type="url"
                       id="link-avatar"
                       required
                       placeholder="Ссылка на картинку"
                       name="link"
                       className="popup__element popup__element_avatar popup__element_add_link"
                       ref={avatarLink}
                />
                <span className="popup__error" id="link-avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;