import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { Button, Form, Container, Stack } from "react-bootstrap";

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
        console.log(response);
        props.loggedIn(
          response.data.token,
          response.data.role,
          response.data.username
        );
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });
  };

  return (
    <Form id="loginForm" onSubmit={(e) => submitHandler(e)}>
      <Form.Text>Login</Form.Text>
      <Stack gap={2} className="col-md-50 mx-auto">
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
            type="password"
            disabled={disabled}
            placeholder="password"
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={disabled}>
          {" "}
          Login{" "}
        </Button>
      </Stack>
    </Form>
  );
}

export default Login;
