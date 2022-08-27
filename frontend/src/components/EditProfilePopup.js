import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // Добавляем стейты (привяжем к полям ввода  в форме)
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  //обработчик  input
  function handleChange(event) {
    const target = event.target;
    target.name === "name"
      ? setName(target.value)
      : setDescription(target.value);
  }

  // обработчик Submit
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonSubmitText="Cохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_name"
        type="text"
        id="profileName"
        name="name"
        value={name || ''}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span className="popup__error profileName-error"></span>
      <input
        className="form__input form__input_type_caption"
        type="text"
        id="profileCaption"
        name="about"
        value={description || ''}
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
      />
      <span className="popup__error profileCaption-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
