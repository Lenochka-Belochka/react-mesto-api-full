import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLink = React.useRef(null);

  React.useEffect(() => {
    avatarLink.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: avatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonSubmitText="Cохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link-input"
        className="form__input form__input_field_link"
        name="link"
        placeholder="Сcылка на аватар"
        type="url"
        required
        ref={avatarLink}
      />
      <span className="popup__error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
