
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./StudentAdd";
import StudentCard from "./StudentCard";

import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  Button,
} from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

import StudentAdd from "./StudentAdd";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./StudentDash.css";
// import { Button } from "bootstrap";



import NavbarComp from "./NavbarComp.js";


function StudentDashboard(props) {
  const [userProfile, cUserProfile] = useState({
    userName: "",
    fname: "",
    lname: "",
    dob: "",
    bio: "",
    course: [],
    employed: null,
    skills: [],
    //date since employment/graduation: String,
    linkedin: "",
    github: "",
    cv: "",
  });

  const [current, cCurrent] = useState(undefined);
  const [show, SetShow] = useState(false);

  const handleShow = () =>  SetShow(true);


  const handleClose = () => SetShow(false);

  const refreshList = () => {
    props.client
      .getProfileByUser(window.localStorage.getItem("username"))
      .then((response) => cUserProfile(response.data));
  };

  const updateProfile = () => {
    let profile = userProfile;
    cCurrent(profile);
  };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateProfile();
    // eslint-disable-next-line
  }, [userProfile]);

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  const consolelog = () => {
    console.log("rendering the studentdash");

  };


  return (
    <>
{/* {consolelog()} */}
    <NavbarComp 
    role={props.role} 
    logout={props.logout}
    />
      <StudentAdd
      show={show}
      handleClose={handleClose}
      handleShow={handleShow}
        username={props.username}
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentProfile={current}
        cCurrentProfile={cCurrent}
      />
      <br/>
      <StudentCard
        userProfile = {userProfile}
      />    
</>
  );
}


export default StudentDashboard
