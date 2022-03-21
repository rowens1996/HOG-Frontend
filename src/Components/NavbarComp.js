import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
} from "react-bootstrap";

import { FaUserGraduate } from "react-icons/fa";

import StudentAdd from "./StudentAdd";


function NavbarComp(props) {
//console.log(props.logout);
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

          <Nav.Link id="navLinks" onClick={() => props.logout()}>
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;