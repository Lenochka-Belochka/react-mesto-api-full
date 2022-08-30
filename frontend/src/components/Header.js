import React from "react";
import logo from '../images/header__logo.svg';
import { Link, Route, Switch } from "react-router-dom";

function Header (props) {
    return (
      <header className="header">
        <img
          className="header__logo"
          alt="лого"
          src={logo}
        />
        <nav className="header__nav"> 
        <p className="header__email">{props.email}</p>
        <Switch>
          <Route exact path='/'>
        <Link to='/signin' className="header__name" onClick={props.exit}>Выйти</Link>  
        </Route>
        <Route path='/signin'>
        <Link to='/signup' className="header__name">Регистрация</Link> 
        </Route>
        <Route path='/signup'>
        <Link to='/signin' className="header__name">Войти</Link>
        </Route>
        </Switch>
        </nav>
      </header>
    );
}

export default Header;