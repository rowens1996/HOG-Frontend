import NavbarComp from "./NavbarComp.js";
import React, { useState, useEffect } from "react";
import SearchAll from "./SearchAll";
import TdaUpdate from "./TdaUpdate"
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
  const [open, setOpen] = useState(false);
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
                src="https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2"
              />
              <Card.Text as="h3">
                {current.fname} {current.lname}
              </Card.Text>
              <Card.Text as="h6">{current.dob}</Card.Text>
              <Card.Title as="h6">Location{current.location}</Card.Title>
            </Card.Header>
            <br />
            <Card.Text>{current.course}</Card.Text>
            <Card.Text>{current.skills.join("   ")}</Card.Text>

           
            <Stack>
              <Button
                variant="secondary"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                //aria-expanded={open}
              >
                Expand Profile
              </Button>
            </Stack>
            <Collapse className="extra" in={open}>
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
                <Card.Text>"current.cohort"</Card.Text>
                <Card.Text>"current.graduated"</Card.Text>
                <Card.Text className="cardButton">
                  <a href={current.cv}>
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
        <Row xs={1} sm={2} md={3} lg={4} xl={5} id="studentRows">
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
