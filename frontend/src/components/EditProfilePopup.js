import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUser";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onSubmit({
            profileName: name,
            profileProfession: description
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            popup="profile"
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'edit'}
            form={'profileData'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
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
                       value={name}
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
                       value={description}
                       onChange={handleChangeDescription}
                />
                <span className="popup__error" id="profileProfession-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;