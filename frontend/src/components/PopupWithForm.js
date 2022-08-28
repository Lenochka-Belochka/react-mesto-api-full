import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      {}

      <div className="popup__frame">
        <form
          name={props.name}
          className={`form form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          <fieldset className="form__fieldset">{props.children}</fieldset>
          <button
            className="popup__button popup__button_type_save"
            type="submit"
          >
            {props.buttonSubmitText}
          </button>
        </form>

        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Close button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
