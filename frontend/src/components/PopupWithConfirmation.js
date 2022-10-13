import PopupWithForm from './PopupWithForm.js'

function PopupWithConfirmation({ isOpen, onClose, card, onCardDelete, submitTitle }) {

    function handleConfirmiation(evt) {
        evt.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            popup="delete"
            name="formDelete"
            title="Вы уверены?"
            text="Да"
            onClose={onClose}
            submitTitle={submitTitle}
            isOpen={isOpen}
            onSubmit={handleConfirmiation}
        >
        </PopupWithForm>
    )
}

export default PopupWithConfirmation;