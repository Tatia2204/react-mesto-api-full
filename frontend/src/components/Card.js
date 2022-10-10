import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUser";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const cardDeleteButtonClassName = (
        `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`
    );

    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    return (
        <article className="element">
            <button aria-label="Удалить карточку" className={cardDeleteButtonClassName} type="button"
                    onClick={handleDeleteClick}
            />
            <img src={props.link} alt={props.name} className="element__mask-group" onClick={handleClick}/>
            <div className="element__group">
                <h2 className="element__location">{props.name}</h2>
                <div className="element__like-group">
                    <button aria-label="Отметить фото" className={cardLikeButtonClassName} type="button"
                            onClick={handleLikeClick}/>
                    <p className="element__likes">{props.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;