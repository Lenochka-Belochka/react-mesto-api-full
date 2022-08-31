import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      {}
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__edit-avatar-button"
            type="button"
            aria-label="edit button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Аватар"
            />
          </button>
        </div>
        <div className="profile__description">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button profile__button_fact_edit"
            type="button"
            aria-label="Edit button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button
          className="profile__button profile__button_fact_add"
          type="button"
          aria-label="Add button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      {}
      <section className="photo-grid">
        <ul className="photo-grid__list">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
