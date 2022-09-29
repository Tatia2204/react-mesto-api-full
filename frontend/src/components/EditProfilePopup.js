import React, {useContext, useState} from "react";
import PopupWithForm from "./PopupWithForm.js";
import {CurrentUser} from "../contexts/CurrentUser";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = useContext(CurrentUser);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit (evt) {
        evt.preventDefault();
        onUpdateUser({
            profileName: name,
            profileProfession: description
        })
    };

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            popup="profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="formProfile"
            title="Редактировать профиль"
            text="Сохранить"
        >
            <label className="popup__indent">
                <input type="text"
                       id="profileName-input"
                       required
                       minLength="2"
                       maxLength="40"
                       placeholder="Имя"
                       name="profileName"
                       className="popup__element popup__element_profile popup__element_add_name"
                       value={name || ''}
                       onChange={handleChangeName}
                />
                <span className="popup__error" id="profileName-input-error"></span>
            </label>
            <label className="popup__indent">
                <input type="text"
                       id="profileProfession-input"
                       required
                       minLength="2"
                       maxLength="200"
                       placeholder="Профессия"
                       name="profileProfession"
                       className="popup__element popup__element_profile popup__element_add_profession"
                       value={description || ''}
                       onChange={handleChangeDescription}
                />
                <span className="popup__error" id="profileProfession-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;