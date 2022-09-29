const modalPictures = document.querySelector('.popup_mask-group');

const aboutProjectLink = document.querySelector('.profile__info-edit');
const addButton = document.querySelector('.profile__info-add');
const avatarButton = document.querySelector('.profile__avatar-button');

const modalProfile = document.querySelector('.popup_profile');
const formProfile = modalProfile.querySelector('[name="formProfile"]');
const nameProfileInput = formProfile.querySelector('[name="profileName"]');
const professionProfileInput = formProfile.querySelector('[name="profileProfession"]');

const listContainer = document.querySelector('.elements');

const modalLocation = document.querySelector('.popup_location');

const modalDeleteCard = document.querySelector('.popup_delete');

const modalAvatar = document.querySelector('.popup_avatar');

const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__element',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_disabled',
    inputErrorClass: 'popup__element_type_error',
    errorClass: 'popup__element_error_visible'
};

export {modalPictures, aboutProjectLink, modalProfile, avatarButton,
    professionProfileInput, listContainer, addButton, modalLocation, nameProfileInput,
    formProfile, validationConfig, modalDeleteCard, modalAvatar};