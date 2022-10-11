import React, { useContext } from "react";
import { CurrentUser } from "../contexts/CurrentUser.js";

function Card({card, onCardClick, onCardLike, onCardClickDelete, onCardDelete}) {

    const currentUser = useContext(CurrentUser);

    function handleClick () {
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onCardClickDelete(card._id);

    }

    function handleDeleteCard () {
        onCardDelete(card._id);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`
    );

    //есть ли у карточки лайк
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    return (
        <article className="element">
            <button aria-label="Удалить карточку" className={cardDeleteButtonClassName} type="button"
                    onClick={handleDeleteClick}
                    onClick={handleDeleteCard}/>
            <img src={card.link} alt={card.name} className="element__mask-group" onClick={handleClick}/>
            <div className="element__group">
                <h2 className="element__location">{card.name}</h2>
                <div className="element__like-group">
                    <button aria-label="Отметить фото" className={cardLikeButtonClassName} type="button"
                            onClick={handleLikeClick}/>
                    <p className="element__likes">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;