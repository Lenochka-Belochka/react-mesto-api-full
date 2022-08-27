export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


export const commonObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inactiveButtonClass: "popup__button_type_disabled",
  submitButtonSelector: ".popup__button_type_save",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_active",
};

export const avatarEditForm = document.querySelector('.popup_type_update-avatar');
export const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
export const cardDeleteButton = document.querySelector('.element__button_delete');



//Объявляем переменные для поп-ап редактирования блока профиля
export const buttonEd = document.querySelector(".profile__button_fact_edit");
export const popupEd = document.querySelector(".popup_type_edit");
export const popupButtonClose = document.querySelector(
  ".popup__button_type_close"
);
export const profileName = document.querySelector(".profile__name");
export const profileCaption = document.querySelector(".profile__caption");
export const formProfileElement = document.querySelector("#profileForm");

//Объявляем еременные для поп-ап редактирования блока карточек
export const cardButton = document.querySelector(".profile__button_fact_add");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupButtonExit = document.querySelector(
  ".popup__button_type_exit"
);
export const cardAddFormElement = document.querySelector("#addPlace");
export const photoName = document.querySelector("#photoName");
export const photoLink = document.querySelector("#photoLink");

//Объявляем переменные для поп-ап общие
export const popupButtonSave = document.querySelector(
  ".popup__button_type_save"
);

//Объявляем переменные для работы с попапом из карточки
export const popupCard = document.querySelector(".popup_type_card");
export const buttonCloseCard = document.querySelector(".popup__button_type_ex");

// DOM
//export const popupName = popupEd.querySelector(".form__input_type_name");
//export const popupCaption = popupEd.querySelector(".form__input_type_caption");
//export const popupPlace = popupAdd.querySelector(".form__input_type_place");
//export const popupLink = popupAdd.querySelector(".form__input_type_link");

// Карточки
export const elements = document.querySelector(".photo-grid__list");

// template
//export const cardTemplate = document.querySelector("#grid-template").content;
