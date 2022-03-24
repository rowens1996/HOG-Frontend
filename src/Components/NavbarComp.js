import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
} from "react-bootstrap";

import { FaUserGraduate } from "react-icons/fa";

//import StudentAdd from "./StudentAdd";

function NavbarComp(props) {
  const updateModal = () => {
    //console.log(props.handleShow)
    if (props.role == "Student") {
      return (
        <Nav.Link id="navLinks" onClick={() => props.handleShow()}>
          Update Profile
        </Nav.Link>
      );
    }
  };
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container id="navContainer">
          <Nav.Item>
            <Navbar.Brand id="header">
              Hire our Graduates <FaUserGraduate id="gradlogo" />
            </Navbar.Brand>
            <Nav.Item>{props.role} Dashboard</Nav.Item>
          </Nav.Item>
          <NavItem id="flex-horizontal">
            <Nav.Link id="navLinks" onClick={() => props.logout()}>
              Logout
            </Nav.Link>
            {updateModal()}
          </NavItem>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
