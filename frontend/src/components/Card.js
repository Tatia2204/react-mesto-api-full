import React, { useContext } from "react";
import { CurrentUser } from "../contexts/CurrentUser.js";

function Card(props) {

    const currentUser = useContext(CurrentUser);

    function handleClick () {
        props.onCardClick(props.card);
    }

    function handleLikeClick () {
        props.onCardLike(props.card);
    }

    function handleDeleteClick () {
        props.onCardClickDelete(props.card._id);
    }

    function handleDeleteCard () {
        props.onCardDelete(props.card._id);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`
    );

    //есть ли у карточки лайк
    const isLiked = props.card.likes.some(i => i === currentUser._id);


    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    return (
        <article className="element">
            <button aria-label="Удалить карточку" className={cardDeleteButtonClassName} type="button"
                    onClick={handleDeleteClick}
                    onClick={handleDeleteCard}/>
            <img src={props.card.link} alt={props.card.name} className="element__mask-group" onClick={handleClick}/>
            <div className="element__group">
                <h2 className="element__location">{props.card.name}</h2>
                <div className="element__like-group">
                    <button aria-label="Отметить фото" className={cardLikeButtonClassName} type="button"
                            onClick={handleLikeClick}/>
                    <p className="element__likes">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;