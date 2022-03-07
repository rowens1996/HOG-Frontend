import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { Button, Container, Form } from "react-bootstrap";

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

  return (
      <Form id="loginForm" onSubmit={(e) => submitHandler(e)}>
        <Form.Text>
          Hire our Graduates
        </Form.Text>
        <br />
        <Form.Text>
          Login
        </Form.Text>
        <Form.Group controlId="loginUserName">
          <Form.Control
          name="username"
          type="text"
          disabled={disabled}
          placeholder="username"
          />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Control
          name="password"
          type="text"
          disabled={disabled}
          placeholder="password"
          />
        </Form.Group>
        <Button variant="outline-success" type="submit" disabled={disabled}>
          {" "}
          Login{" "}
        </Button>
      </Form>
  );
}

export default Login;
