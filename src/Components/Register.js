import React, { useState } from "react";
//import { useNavigate} from "react-router-dom";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, FormCheck, Stack } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  const [disabled, cDisabled] = useState(false);

  const roleForm = (e) => {
    let stringRole = "";
    if (e.target.role.checked) {
      stringRole = "Employer";
    } else {
      stringRole = "Student";
    }
    return stringRole;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.persist();
    let sRole = roleForm(e);
    console.log(e.target.role.checked);
    props.client
      .addNewUser(e.target.username.value, e.target.password.value, sRole)
      .then((response) => {
        cDisabled(false);
        toast.success("You have successfully registered");
      })
      .catch((err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      });
  };  

  return (
    <>
      <Form id="registerForm" onSubmit={(e) => submitHandler(e)}>
        <Form.Text>Create an Account</Form.Text>
        <Stack gap={2} className="col-md-50 mx-auto">
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
            type="password"
            disabled={disabled}
            placeholder="password"
          />
        </Form.Group>
        {/* <Form.Text>Are you an employer?</Form.Text> */}
        <Form.Group controlId="RegisterRole">
          <FormCheck name="role" type="checkbox" label="I am an employer" />
        </Form.Group>
        </Stack>
        <div>
        <Stack gap={2} className="col-md-50 mx-auto">
          <Button variant="success" type="submit" disabled={disabled}>
            {" "}
            Register{" "}
          </Button>
          <ToastContainer />
          </Stack>
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
