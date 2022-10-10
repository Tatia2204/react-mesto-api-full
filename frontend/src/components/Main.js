import React, { useContext } from "react";
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUser.js";

function Main (props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content" >
            <section className="profile">
                <div className="profile__container">
                    <button
                        aria-label="Поменять аватар"
                        className="profile__avatar-button"
                        onClick={props.onEditAvatar}>
                    </button>
                    <img src={currentUser.avatar} alt="фото" className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        aria-label="Перейти к изменению профеля"
                        className="link profile__info-edit"
                        type="button"
                        onClick={props.onEditProfile}>
                    </button>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button
                    aria-label="Перейти к добавлению информации"
                    className="link profile__info-add"
                    type="button"
                    onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="elements">
                {props.cards.map((card, id) => (
                    <Card
                        key={id}
                        card={card}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;