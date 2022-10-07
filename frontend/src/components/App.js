import React, {useEffect} from 'react';
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
import PopupWithForm from "./PopupWithForm.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isFormatPopupOpen, setIsFormatPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const history = useHistory();

    function handleEditAvatarHandler() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileHandler() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceHandler() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
    }

    function handleCardClickDelete() {
        setIsFormatPopupOpen(!isFormatPopupOpen);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsFormatPopupOpen(false)
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(newProfileInfo) {
        const jwt = localStorage.getItem('jwt');
        api.changeProfileInfo(newProfileInfo, jwt)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        const jwt = localStorage.getItem('jwt');
        api.changeProfileAvatar(data, jwt)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlaceSubmit(data) {
        const jwt = localStorage.getItem('jwt');
        api.addNewCard(data, jwt)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const jwt = localStorage.getItem('jwt');
        api.changeLikeCardStatus(card._id, !isLiked, jwt)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(cardId) {
        const jwt = localStorage.getItem('jwt');
        api.deleteCard(cardId, jwt)
            .then(() => {
                setCards((cards) => cards.filter(card => card._id !== cardId));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAuthorization(data) {
        return auth
            .authorize(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setIsLoggedIn(true);
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

    function handleLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }


    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (isLoggedIn === true) {
            api
                .getProfileInfo(jwt)
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            api
                .getInitialCards(jwt)
                .then((data) => {
                    setCards(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth
                .getContent(token)
                .then((res) => {
                    setUserEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => {
                    localStorage.removeItem('jwt');
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [history]);

    return (
        <CurrentUser.Provider value={currentUser}>

            <div className="page">
                <Header loggedIn={isLoggedIn} userEmail={userEmail} onLogout={handleLogout} onRegister={isRegister}/>
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
                        onCardClickDelete={handleCardClickDelete}
                        onCardDelete={handleCardDelete}
                        userEmail={userEmail}
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
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    popup="delete"
                    onClose={closeAllPopups}
                    name="formDelete"
                    title="Вы уверены?"
                    text="Да"
                >
                </PopupWithForm>

            </div>

        </CurrentUser.Provider >
    );
}

export default App;


