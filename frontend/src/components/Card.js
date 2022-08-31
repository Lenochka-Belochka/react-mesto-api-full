import React from "react";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

/*
  // лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((item) => {
    return item === currentUser._id;
  });
  

  // cоздаём переменную для кнопки лайка
const cardLikeButtonClassName = `element__button ${
  isLiked ? "element__button_active" : ""
}`;
*/
  // проверка владельца
  const isOwn = card.owner === currentUser._id;

  // создаём переменную для кнопки удаления
  const cardDeleteButtonClassName = `element__button_delete ${
    isOwn ? "" : "element__button_delete-hidden"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__picture">
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Trash button"
          onClick={handleDeleteClick}
        ></button>
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={handleClick}
        />
      </div>
      <div className="element__item-description">
        <h2 className="element__item-title">{card.name}</h2>
        <div className="element__like-group">
          <button
            className="element__button_active"
            type="button"
            aria-label="Like button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-number">{card.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
