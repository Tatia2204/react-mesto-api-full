import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [formValue, setFormValue] = useState({name: "", link: ""});

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: formValue.name,
            link: formValue.link
        })
    }

    useEffect(() => {
        setFormValue({
            name: "",
            link: ""
        })
    }, [isOpen])

    return (
        <PopupWithForm
            popup="location"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="formLocation"
            title="Новое место"
            text="Создать"
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
                       value={formValue.name}
                       onChange={handleChange}
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
                       value={formValue.link}
                       onChange={handleChange}
                />
                <span className="popup__error" id="link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;