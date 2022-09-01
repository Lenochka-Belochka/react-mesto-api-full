import React from "react";
import Sign from "./Sign";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChange(event) {
    const target = event.target;
    target.name === "email"
      ? setEmail(target.value)
      : setPassword(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
    props.onLogin(email, password);
  }

  return (
    <Sign
      name={props.name}
      title={props.title}
      email={email}
      password={password}
      buttonSubmitText={props.buttonSubmitText}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default Login;
