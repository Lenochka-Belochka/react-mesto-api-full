import React from "react";
import Sign from "./Sign";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onRegister(this.state.password, this.state.email);
  }

  render() {
    return (
      <>
        <Sign
          name={this.props.name}
          title={this.props.title}
          email={this.state.email}
          password={this.state.password}
          buttonSubmitText={this.props.buttonSubmitText}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <Link to="/signin" className="form__login-link">
            Уже зарегистрированы? Войти
          </Link>
        </Sign>
      </>
    );
  }
}

export default withRouter(Register);
