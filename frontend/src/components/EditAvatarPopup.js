import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {

    const avatarLink = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit({
            avatar: avatarLink.current.value,
        });
    }

    React.useEffect(() => {
        avatarLink.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            popup="avatar"
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'avatar'}
            form={'placeData'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
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