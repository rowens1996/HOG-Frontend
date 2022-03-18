import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  Row,
  Col
} from "react-bootstrap";

import { FaUserGraduate } from "react-icons/fa";

import "./EmployerDash.css";

import NavbarComp from "./NavbarComp.js";


function EmployerDash(props) {
  const [studentList, cStudentsList] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getProfile().then((response) => cStudentsList(response.data));
  };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  const buildCards = () => {
    return studentList.map((something) => {
      return (
        <Col key={something._id}>
         {/* <Card className="containerCards" >
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title id="title">
                {something.fname} {something.lname} <br /> {something.userName}{" "}
              </Card.Title>
              <Card.Title id="subtitle">
                {something.dob} <br /> {something.course}
              </Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
           
            <ListGroup className="list-group-flush">
              <ListGroupItem>{something.linkedin}</ListGroupItem>
              <ListGroupItem>{something.github}</ListGroupItem>
              <ListGroupItem>{something.cv}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href={something.linkedin}>Linkedin</Card.Link>
              <Card.Link href={something.github}>Github</Card.Link>
            </Card.Body>
          </Card> */}
          <Card id="profileCards" className="ad-container">
            <Card.Header className="ad-userdetails">
            <Card.Img className="profileAvatar" src="holder.js/100px180?text=Image cap" />
              <Card.Text as="h3">
                {something.fname} {something.lname}
              </Card.Text>
              <Card.Text as="h6">
                {something.dob}
              </Card.Text>
              <Card.Title as="h6">Location{something.location}</Card.Title>
            </Card.Header>
            <br />
            <Card.Text>Skills, skills, etc</Card.Text>
            <Card.Text className="cardButton">
              <a href={something.cv}>
                <Button size="sm" variant="success">
                  Download CV
                </Button>
              </a>
              </Card.Text>
            <Card.Text className="cardButton">
              <a href={something.linkedin}>
                <Button size="sm" variant="success">
                  Linkedin
                </Button>
                
              </a>
            </Card.Text>
            <Card.Text className="cardButton">
              <a href={something.github}>
                <Button size="sm" variant="success">
                  Github
                </Button>
              </a>
            </Card.Text>
            <Card.Text className="cardButton">
              <a href="{something.email}">
                <Button size="sm" variant="success">
                  email
                </Button>
              </a>
            </Card.Text>
            <Card.Text>"something.cohort"</Card.Text>
            <Card.Text>"something.graduated"</Card.Text>
          </Card>
       </Col>
      );
    });
  };

  return (
    <>
     
      <NavbarComp role={props.role}/>
      <Nav.Link id="navLinks" onClick={() => props.logOut()}></Nav.Link>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} id="studentRows">
        {buildCards()}
        </Row>
      </Container>
      
   
      
      </>
    /* <StudentAdd
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
      userProfile = {props.userProfile}
    /> */

     
  );
}

export default EmployerDash;
