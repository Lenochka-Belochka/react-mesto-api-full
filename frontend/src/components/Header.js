import React from "react";
import { Route, Link, Switch } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={props.logo} alt="Лого Mesto Russia" />
      <div className="header__authorization">
        <p className="header__email">{props.email}</p>
        <Switch>
          <Route exact path="/">
            <p className="header__link" onClick={props.onSignOut}>
              Выйти
            </p>
          </Route>

          <Route path="/signup">
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </Route>

          <Route path="/signin">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
