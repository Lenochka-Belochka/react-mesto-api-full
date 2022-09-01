import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  //обработчик input
  function handleChange(event) {
    const target = event.target;
    // обновляем стейты в привязке к имени поля
    target.name === "name" ? setName(target.value) : setLink(target.value);
  }

  // обработчик Submit
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonSubmitText="Cоздать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_place"
        type="text"
        id="photoName"
        name="name"
        value={name}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
      />
      <span className="popup__error photoName-error"></span>
      <input
        className="form__input form__input_type_link"
        type="url"
        id="photoLink"
        value={link}
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleChange}
      />
      <span className="popup__error photoLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
