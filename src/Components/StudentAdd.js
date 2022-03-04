import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Modal, ModalTitle } from "react-bootstrap/";

function StudentAdd(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    e.persist();
   // console.log(props.client);
    cDisabled(true);
    let result;
    if (props.currentProfile) {
      result = props.client.updateProfile(
        props.currentProfile._id,
        e.target.fname.value,
        e.target.lname.value,
        e.target.dob.value,
        e.target.bio.value,
        e.target.linkedin.value,
        e.target.github.value,
        e.target.cv.value
      );
    } else {
      console.log(e.target.fname.value);
      result = props.client.addProfile(
        e.target.fname.value,
        e.target.lname.value,
        e.target.dob.value,
        e.target.bio.value,
        e.target.linkedin.value,
        e.target.github.value,
        e.target.cv.value
      );
    }
    result
      .then(() => {
        cDisabled(false);
        e.target.reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an unexpected error occured");
        cDisabled(false);
      });
  };

  // cancel event update
  const cancelUpdate = () => {
    props.cCurrentProfile(undefined);
    document.getElementById("addForm").reset();
  };

  // show cancel button
  const showCancelButton = () => {
    return (
      <button
        className="button-28"
        type="button"
        onClick={() => cancelUpdate()}
      >
        {" "}
        Cancel Update{" "}
      </button>
    );
  };

  return (
    <Form onSubmit={(e) => submitHandler(e)} id="addForm">
          <Container id="formContainer">
            <Form.Group controlId="eventName">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentProfile?.fname}
                name="fname"
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="eventLocation">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentProfile?.lname}
                name="lname"
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={props.currentProfile?.date}
                name="date"
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="eventPrice">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={5}
                defaultValue={props.currentProfile?.bio}
                name="bio"
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="textInput">
              <Form.Label>linkedin</Form.Label>
              <Form.Control
                type="url"
                name="linkedin"
                defaultValue={props.currentProfile?.linkedin}
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="textInput">
              <Form.Label>github</Form.Label>
              <Form.Control
                type="url"
                name="github"
                defaultValue={props.currentProfile?.github}
                disabled={disabled}
              />
            </Form.Group>

            <Form.Group controlId="eventLocation">
              <Form.Label>cv</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.currentProfile?.cv}
                name="cv"
                disabled={disabled}
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Container>
        </Form>
  );
}

export default StudentAdd;
