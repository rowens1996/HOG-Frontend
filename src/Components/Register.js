import React, { useState } from "react";
//import { useNavigate} from "react-router-dom";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(props) {
  const [disabled, cDisabled] = useState(false);
  //const navigate = useNavigate();
 
  const submitHandler = (e) => {
    
    e.preventDefault();
    e.persist();
    props.client
    .addNewUser(e.target.username.value, e.target.password.value, e.target.role.value)
      .then((response) => {
        cDisabled(false);
        toast.success("You have successfully registered")
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });
  }

  return (
<>
    <Form id="RegisterForm" onSubmit={(e) => submitHandler(e)}>
        <Form.Text>
          Hire our Graduates
        </Form.Text>
        <br />
        <Form.Text>
          Create an Account
        </Form.Text>
        <Form.Group controlId="RegisterUserName">
          <Form.Control
          name="username"
          type="text"
          disabled={disabled}
          placeholder="username"
          />
        </Form.Group>
        <Form.Group controlId="RegisterPassword">
          <Form.Control
          name="password"
          type="text"
          disabled={disabled}
          placeholder="password"
          />
        </Form.Group>
        <Form.Group controlId="RegisterRole">
          <Form.Control
          name="role"
          type="text"
          disabled={disabled}
          placeholder="role"

          />
        </Form.Group>

        <div>
        <Button variant="outline-success" type="submit" disabled={disabled}>
          {" "}
          Register{" "}
        </Button>
        <ToastContainer/>
        </div>
      </Form>

     
    {/* <div className="Register-child">
      <span className="Register-header">Hire our Graduates</span>
      <span className="Register-subheader">Register an Account</span>
      <hr />
      <form id="registerForm" onSubmit={(e) => submitHandler(e)}>
        <br />
        <input type="text" name="username" disabled={disabled} placeholder="username"/>
        <br />
        <br />
        <input type="password" name="password" disabled={disabled} placeholder="password"/>
        <br />
        <br />
        <div>
        <Button variant="outline-success" type="submit" disabled={disabled}>
          {" "}
          Register{" "}
        </Button>
        <ToastContainer />
        </div>
      </form>
    </div> */}
    </>
  );
}

export default Register;