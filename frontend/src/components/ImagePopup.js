import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_card ${props.card._id && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="popup__button popup__button_type_close"
          type="reset"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <h2 className="popup__title">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
