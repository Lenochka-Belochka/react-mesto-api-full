import React from "react";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // проверка владельца
  const isOwn = props.card.owner._id === currentUser._id;

  // создаём переменную для кнопки удаления
  const cardDeleteButtonClassName = `element__button_delete ${
    isOwn ? "" : "element__button_delete-hidden"
  }`;

  // лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // cоздаём переменную для кнопки лайка
  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
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
          src={props.card.link}
          alt={props.card.name}
          className="element__image"
          onClick={handleClick}
        />
      </div>
      <div className="element__item-description">
        <h2 className="element__item-title">{props.card.name}</h2>
        <div className="element__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
