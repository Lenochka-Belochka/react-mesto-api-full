import React from "react";
import PopupWithoutForm from "./PopupWithoutForm";

function InfoTooltip(props) {
  return (
    <PopupWithoutForm isOpen={props.isOpen} onClose={props.onClose}>
      {props.successReg ? (
        <div className="popup__success-container">
          <img
            className="popup__success-picture"
            src={props.success_pic}
            alt="Pic success"
          />

          <p className="popup__explanation">
            Вы успешно
            <br />
            зарегистрировались!
          </p>
        </div>
      ) : (
        <div className="popup__success-container">
          <img
            className="popup__success-picture"
            src={props.unsuccess_pic}
            alt="Pic unsuccess"
          />

          <p className="popup__explanation">
            Что-то пошло не так!
            <br />
            Попробуйте еще раз.
          </p>
        </div>
      )}
    </PopupWithoutForm>
  );
}

export default InfoTooltip;
