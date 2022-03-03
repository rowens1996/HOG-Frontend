import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Button, Container } from "react-bootstrap";

function Login(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    // console.log("submit");

    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });
  };

  const signupHandler = (e) => {
    e.preventDefault();
    console.log(props);
    console.log(e);
    props.client
      .addNewUser(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        // props.loggedIn(response.data.token);
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });

  }

  return (
    <div className="login-child">
      <span className="login-header">Hire our Graduates</span>
      <span className="login-subheader">Login/SignUp</span>
      <hr />
      <form onSubmit={(e) => submitHandler(e)}>
        <br />
        <input type="text" name="username" disabled={disabled} placeholder="username"/>
        <br />
        <br />
        <input type="password" name="password" disabled={disabled} placeholder="password"/>
        <br />
        <br />
        <Button variant="outline-success" type="submit" disabled={disabled}>
          {" "}
          Login{" "}
        </Button>
&nbsp;&nbsp;&nbsp;
        <Button variant="outline-primary" onClick={(e) => signupHandler(e)} type="" disabled={disabled}>
          {" "}
          Sign Up{" "}
        </Button>

      </form>
    </div>
  );
}

export default Login;
