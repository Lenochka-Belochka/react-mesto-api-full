import React from "react";

function Sign(props) {
  return (
    <div className="form__container">
      <form name={props.name} onSubmit={props.onSubmit}>
        <h2 className="form__subtitle">{props.title}</h2>

        <fieldset className="form__info">
          <label className="form__field">
            <input
              id="email-input"
              type="text"
              className="form__part"
              value={props.email}
              name="email"
              placeholder="Email"
              minlenght="2"
              maxlenght="40"
              required
              onChange={props.onChange}
            />
            <span className="popup__error profileName-error"></span>
          </label>
          <label className="form__field">
            <input
              id="password-input"
              type="password"
              className="form__part"
              value={props.password}
              name="password"
              placeholder="Пароль"
              minlenght="2"
              maxlenght="200"
              required
              onChange={props.onChange}
            />
            <span className="popup__error profileCaption-errorr"></span>
          </label>
        </fieldset>

        <button className="form__submit-button" type="submit">
          {props.buttonSubmitText}
        </button>
      </form>
      {}
      {props.children}
    </div>
  );
}

export default Sign;
