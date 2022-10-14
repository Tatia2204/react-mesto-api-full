import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUser } from "../contexts/CurrentUser.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
// import PopupWithForm from "./PopupWithForm.js";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [removedCardId, setRemovedCardId] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const history = useHistory();

    const [editProfilePopupSubmitTitle, setEditProfilePopupSubmitTitle] = React.useState('Сохранить');
    const [editAvatarPopupSubmitTitle, setEditAvatarPopupSubmitTitle] = React.useState('Сохранить');
    const [addPlacePopupSubmitTitle, setAddPlacePopupSubmitTitle] = React.useState('Создать');
    const [confirmationPopupSubmitTitle, setConfirmationPopupSubmitTitle] = React.useState('Да');

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line
    }, [history]);

    function handleEditAvatarHandler() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileHandler() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceHandler() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }

    function handleCardDeleteClick(cardId) {
        setIsConfirmationPopupOpen(true);
        setRemovedCardId(cardId);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard({})
    }

    function handleUpdateUser(data) {
        setEditProfilePopupSubmitTitle('Сохранение...')
        const jwt = localStorage.getItem('jwt');
        api.changeProfileInfo(data, jwt)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
            setEditProfilePopupSubmitTitle('Сохранить')
        })
    }

    function handleUpdateAvatar(data) {
        const jwt = localStorage.getItem('jwt');
        setEditAvatarPopupSubmitTitle('Сохранение...')
        api.changeProfileAvatar(data, jwt)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setEditAvatarPopupSubmitTitle('Сохранить')
            })
    }

    function handleAddPlaceSubmit(data) {
        const jwt = localStorage.getItem('jwt');
        setAddPlacePopupSubmitTitle('Создание...')
        api.addNewCard(data, jwt)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setAddPlacePopupSubmitTitle('Создать')
            })
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some((i) => i === currentUser._id);
        const jwt = localStorage.getItem('jwt');
        api
            .changeLikeCardStatus(card._id, !isLiked, jwt)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(cardId) {
        console.log('handleCardDelete':cardId);
        const jwt = localStorage.getItem('jwt');
        setConfirmationPopupSubmitTitle('Удаление...')
        api.deleteCard(cardId, jwt)
            .then(() => {
                console.log('далить карточку':card._id, cardId);
                setCards((cards) => cards.filter(card => card._id !== cardId));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setConfirmationPopupSubmitTitle('Да')
            })
    }

    function handleAuthorization(data) {
        return auth
            .authorize(data)
            .then((data) => {
                setIsLoggedIn(true);
                localStorage.setItem('jwt', data.token)
                setUserEmail(data.email);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltip();
            });
    }

    function handleRegister(data) {
        return auth
            .register(data)
            .then(() => {
                setIsRegister(true);
                handleInfoTooltip();
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err);
                setIsRegister(false);
                handleInfoTooltip();
            });
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }
        auth
            .getContent(jwt)
            .then((data) => {
                setUserEmail(data.email);
                setCurrentUser(data)
                setIsLoggedIn(true);
                history.push('/');
            })
            .catch((err) => console.log(err));
        api
            .getInitialCards(jwt)
            .then((res) => {
                setCards(res.data)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
        }
    }, [isLoggedIn, history]);

    function handleLogout() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setIsLoggedIn(false);
        setCurrentUser({});
        setUserEmail('');
    }

    return (
        <CurrentUser.Provider value={currentUser}>

            <div className="page">
                <Header
                    loggedIn={isLoggedIn}
                    userEmail={userEmail}
                    onLogout={handleLogout}
                />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path="/sign-in">
                        <Login onLogin={handleAuthorization}/>
                    </Route>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={isLoggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarHandler}
                        onEditProfile={handleEditProfileHandler}
                        onAddPlace={handleAddPlaceHandler}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDeleteClick={handleCardDeleteClick}
                    />
                </Switch>
                <Footer />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isConfirmed={isRegister}
                    onClose={closeAllPopups}
                    isOpen={isInfoTooltipOpen}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    submitTitle={editProfilePopupSubmitTitle}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    submitTitle={editAvatarPopupSubmitTitle}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    submitTitle={addPlacePopupSubmitTitle}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithConfirmation
                    isOpen={isConfirmationPopupOpen}
                    submitTitle={confirmationPopupSubmitTitle}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={removedCardId} />

            </div>

        </CurrentUser.Provider >
    );
}

export default App;


