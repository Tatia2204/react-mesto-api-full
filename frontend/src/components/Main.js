import React, { useContext } from "react";
import Card from "./Card.js"
import { CurrentUser } from "../contexts/CurrentUser.js";

function Main ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick,
                   onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUser);
    const { name, about, avatar } = currentUser;

    return (
        <main className="content" >
            <section className="profile">
                <div className="profile__container">
                    <button
                        aria-label="Поменять аватар"
                        className="profile__avatar-button"
                        onClick={onEditAvatar}>
                    </button>
                    <img src={avatar} alt="фото" className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{name}</h1>
                    <button
                        aria-label="Перейти к изменению профеля"
                        className="link profile__info-edit"
                        type="button"
                        onClick={onEditProfile}>
                    </button>
                    <p className="profile__profession">{about}</p>
                </div>
                <button
                    aria-label="Перейти к добавлению информации"
                    className="link profile__info-add"
                    type="button"
                    onClick={onAddPlace}>
                </button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;