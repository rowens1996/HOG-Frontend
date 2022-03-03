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
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
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
    <div className="newtitle">
      {props.currentProfile ? "Update" : "Add"}
      <br />

      <form
        onSubmit={(e) => submitHandler(e)}
        id="addForm"
        className="addtitles"
      >
        <input
          type="text"
          defaultValue={props.currentProfile?.fname}
          name="fName"
          disabled={disabled}
          id="addinput"
          placeholder="first name"
        />

        <input
          type="text"
          defaultValue={props.currentProfile?.lname}
          name="lName"
          disabled={disabled}
          id="addinput"
          placeholder="last name"
        />

        <input
          type="date"
          defaultValue={props.currentProfile?.dob}
          name="dateofbirth"
          disabled={disabled}
          id="addinput"
          placeholder="date"
        />

        <input
          type="text"
          defaultValue={props.currentProfile?.bio}
          name="bio"
          disabled={disabled}
          id="addinput"
          placeholder="bio"
        />

        <input
          type="text"
          defaultValue={props.currentProfile?.linkedin}
          name="linkedin"
          disabled={disabled}
          id="addinput"
          placeholder="linkedin url"
        />
        <input
          type="text"
          defaultValue={props.currentProfile?.github}
          name="github"
          disabled={disabled}
          id="addinput"
          placeholder="github url"
        />
        <input
          type="text"
          defaultValue={props.currentProfile?.cv}
          name="lName"
          disabled={disabled}
          id="addinput"
          placeholder="placeholder"
        />
        <br />
        <br />
        <button className="add" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
      {props.currentProfile ? showCancelButton() : null}
    </div>
  );
}

export default StudentAdd;
