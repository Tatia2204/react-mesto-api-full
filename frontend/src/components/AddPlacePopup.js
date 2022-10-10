import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            name: name,
            link: link,
        });

        props.onClose();
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            popup="location"
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'add'}
            form={'placeData'}
            title={'Новое место'}
            buttonText={'Создать'}
            onSubmit={handleSubmit}
        >
            <label className="popup__indent">
                <input type="text"
                       id="name-input"
                       required
                       minLength="2"
                       maxLength="30"
                       placeholder="Название"
                       name="name"
                       className="popup__element popup__element_location popup__element_add_heading"
                       value={name}
                       onChange={handleNameChange}
                />
                <span className="popup__error" id="name-input-error"></span>
            </label>
            <label className="popup__indent">
                <input type="url"
                       id="link-input"
                       required
                       placeholder="Ссылка на картинку"
                       name="link"
                       className="popup__element popup__element_location popup__element_add_link"
                       value={link}
                       onChange={handleLinkChange}
                />
                <span className="popup__error" id="link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
