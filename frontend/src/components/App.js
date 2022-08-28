import React from "react";
import { useEffect, useState } from "react";
import logo from "../../src/images/header/logo.svg";
import successPic from "../../src/images/header/success_pic.svg";
import unsuccessPic from "../../src/images/header/unsuccess_pic.svg";

import avatar from "../../src/images/profile/Avatar.png";

import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";
import { api } from "../../src/utils/Api";
import * as auth from "../utils/auth";
import { Route, Switch } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccessRegLog, setIsSuccessRegLog] = useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = React.useState(false);

  // стейт данных о карточках
  const [cards, setCards] = React.useState([]);

  function handleLogin(userEmail) {
    setLoggedIn(true);
    setUserEmail(userEmail);
  }

  function handleSuccessRegLog(res) {
    if (res) setIsSuccessRegLog(true);
    else setIsSuccessRegLog(false);
    setInfoTooltipState(true);
  }

  const history = useHistory();

  // разлогон делаем
  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/sign-in");
  }

useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch(err => console.log(err))
    if (token) {
      auth.examinationValidationToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            history.push('/');
          }
        })
        .catch(err => console.log(err))
    }
  }, []);

   /* if (loggedIn) {
      api
        .getUserProfile()
        .then((userData) => {
          console.log(userData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка при запросе данных пользователя: ${err}!`);
        });
    }
  }, [loggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка при проверке токена: ${err}!`);
        });
    }
  }

  //
  useEffect(() => {
    checkToken();
  }, [loggedIn]);
*/
  //  лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //запрос в API, получение обновлённых данных карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных карточки: ${err}!`);
      });
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}!`);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          console.log(cards);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка при запросе карточек: ${err}!`);
        });
    }
  }, [loggedIn]);

  // переменная состояния (большая картинка)
  const [selectedCard, setSelectedCard] = React.useState({});

  // нажатие на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // нажатие на кнопки
  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  // закрытие попапов
  function closeAllPopups(evt) {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setInfoTooltipState(false);
    setSelectedCard({});
  }

  // обработчик  профиля пользователя
  function handleUpdateUser(newProfile) {
    api
      .saveNewProfile(newProfile)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения данных пользователя: ${err}!`);
      });
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(newAvatar) {
    api
      .updateAvatar(newAvatar)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения аватара пользователя: ${err}!`);
      });
  }

  // обработчик добавления  карточки
  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сохранения новой карточки: ${err}!`);
      });
  }

  function handleLoginSubmit(password, email) {
    auth.login(password, email)
    .then((res) => {
      setLoggedIn(true);
      localStorage.setItem("jwt", res.token);
      history.push("/");
      handleLogin(email);
    })
    .catch((err) => {
      console.log(`Ошибка при регистрации пользователя: ${err}!`);
      handleSuccessRegLog(false);
    });
     
  }

  // обработчик registration
  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((res) => {
        console.log(res);
        if (res) {
          history.push("/sign-in");
          handleSuccessRegLog(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}!`);
        handleSuccessRegLog(false);
      });
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header logo={logo} email={userEmail} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            avatar={avatar}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register
              name="registration"
              title="Регистрация"
              buttonSubmitText="Зарегистрироваться"
              onRegister={handleRegisterSubmit}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              name="login"
              title="Вход"
              email={userEmail}
              buttonSubmitText="Войти"
              onLogin={handleLoginSubmit}
            />
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          buttonSubmitText="Да"
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          successReg={isSuccessRegLog}
          success_pic={successPic}
          unsuccess_pic={unsuccessPic}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
