
import React, { useState, useEffect } from "react";

import "./TdaDash.css"
import NavbarComp from "./NavbarComp.js";
import SearchAll from "./SearchAll";
import TdaUpdate from "./TdaUpdate";
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  Row,
  Col,
  Collapse,
  Stack,
} from "react-bootstrap";

import { FaUserGraduate } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";



function TdaDash(props) {
  const [studentList, cStudentsList] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [open, cOpen] = useState({});
  const [show, SetShow] = useState(false);

  const handleShow = () =>  SetShow(true);


  const handleClose = () => SetShow(false);


  const removeProfile = (id) => {
    props.client.removeProfile(id).then(() => refreshList());
  };

  const updateTdaProfile = (ad) => {
    cCurrent(ad);
  };

  const refreshList = () => {
    props.client.getProfile().then((response) => cStudentsList(response.data));
  };

  const querySearch = (searchEmp) => {
    props.client
      .queryResult(searchEmp)
      .then((response) => cStudentsList(response.data));
  };


  const employed = (employed) => {
    if (employed) {
      return "Employed";
    } else {
      return "Looking for Work";
    }
  };

  const collapse = (id) => {
    cOpen((prevState => ({...prevState, [id]: !prevState[id]})))
  }

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  const buildCards = () => {
    return studentList.map((current) => {
      return (
        <Col key={current._id}>
          <Card className="mappedCards">
            <Card.Header className="details">
              <Card.Img
                className="profilepic"
                src={`http://localhost:3001/file/get/${current.avatar}`}
              />
              <Card.Text as="h3">
                {current.fname} {current.lname}
              </Card.Text>
              <Card.Text as="h6">{current.dob}</Card.Text>
              <Card.Title as="h6">{current.location}</Card.Title>
            </Card.Header>
            <br />
            <Card.Text>{current.course}</Card.Text>
            <Card.Text>{current.skills.join("   ")}</Card.Text>

           
            <Stack>
              <Button
                variant="secondary"
                onClick={(() => collapse(current._id))}
                aria-controls="example-collapse-text"
                //aria-expanded={open}
              >
                Expand Profile
              </Button>
            </Stack>
            <Collapse className="extra" in={open[current._id]}>
              <div className="extra">
                &nbsp; &nbsp; &nbsp;
                <Card.Text className="cardButton">
                  <a href={current.linkedin}>
                    <i>
                      <BsLinkedin size={40} />
                    </i>
                  </a>
                </Card.Text>
                &nbsp; &nbsp; &nbsp;
                <Card.Text className="cardButton">
                  <a href={current.github}>
                    <i>
                      <BsGithub size={40} color={"var(--githubgray)"} />
                    </i>
                  </a>
                </Card.Text>
                &nbsp; &nbsp; &nbsp;
                <Card.Text className="cardButton">
                  <a href={current.github}>
                    <i>
                      <AiTwotoneMail size={40} color={"white"} />
                    </i>
                  </a>
                </Card.Text>
                <Card.Text>Employment Status: {employed(current.employed)} </Card.Text>
                <Card.Text>"current.graduated"</Card.Text>
                <Card.Text className="cardButton">
                  <a href={`http://localhost:3001/file/get/${current.cv}`} target="_blank">
                    <Button size="sm" variant="success">
                      Download CV
                    </Button>
                  </a>
                </Card.Text>
              </div>
            </Collapse>
            <br/>
           
            <Container className = "update">
              
            <Button
               variant = "danger"
                className="remove"
                onClick={() => removeProfile(current._id)}
                >
              Delete
            </Button>
            
            &nbsp; &nbsp; &nbsp;
            
            <Button
            onClick={() =>{ 
              handleShow();
              updateTdaProfile(current) }}
        
            >
                Update
            </Button>
           
            </Container>
            
          </Card>
         

        </Col>
        
      );
    });
  };

  return (
    <>
      <NavbarComp role={props.role} logout={props.logout} />
      <Nav.Link id="navLinks" onClick={() => props.logout()}></Nav.Link>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4}  id="studentRows">
          {buildCards()}
        </Row>

        <TdaUpdate
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
       
        
      </Container>

      <SearchAll
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        //cFname={cFname}
        //cLocation={cLocation}
        //getByLocation={(loc) => getByLocation(loc)}
        //getByFname={(fnam) => getByFname(fnam)}
        // currentStudent = {current}
        client={props.client}
        querySearch={querySearch}
        currentProfile={current}
      />
    </>
  );
}

export default TdaDash;
