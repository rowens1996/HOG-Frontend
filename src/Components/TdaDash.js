import React, { useState, useEffect } from "react";
import "./TdaDash.css";
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
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaPenAlt} from "react-icons/fa";

function TdaDash(props) {
  const [studentList, cStudentsList] = useState([]);
  const [current, cCurrent] = useState({});
  const [open, cOpen] = useState({});
  const [show, SetShow] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleShow = () => SetShow(true);

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
    cOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const icons = (skills) => {
    let skillIcons = [];
    if (skills.includes("CSS")) {
      skillIcons.push(<FaCss3Alt size={40} color={"#264de4"} />);
    }
    if (skills.includes("React")) {
      skillIcons.push(<FaReact size={40} color={"#61DBFB"} />);
    }
    if (skills.includes("HTML")) {
      skillIcons.push(<FaHtml5 size={40} color={" #E34C26"} />);
    }
    if (skills.includes("MongoDB")) {
      skillIcons.push(<SiMongodb size={40} color={"#3FA037"} />);
    }
    if (skills.includes("JS")) {
      skillIcons.push(<SiJavascript size={40} color={"#F0DB4F"} />);
    }
    let ico = skillIcons.map((item) => {
      return item;
    });
    return ico;
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
                src={`https://hireourgraduates.herokuapp.com/file/get/${current.avatar}`}
              />
              <Card.Text as="h3">
                {current.fname} {current.lname}
              </Card.Text>
              <Card.Text as="h6">{current.dob}</Card.Text>

              <Card.Title as="h6">{current.location}</Card.Title>
            </Card.Header>
            <br />
            <Card.Text>{current.course}</Card.Text>
            <Card.Text className="mappedSkills">{icons(current.skills, current._id)}</Card.Text>
            <Stack>
              <Button
                variant="secondary"
                onClick={() => collapse(current._id)}
                aria-controls="example-collapse-text"
                //aria-expanded={open}
              >
                Expand Profile
              </Button>
            </Stack>
            <br/>
            <Collapse className="extra" in={open[current._id]}>
              <Container className="expand collapse container">
                <Card.Text className="cardButton">
                  <a href={current.linkedin}>
                    <i>
                      <BsLinkedin size={40} />
                    </i>
                  </a>
                </Card.Text>
                <Card.Text className="cardButton">
                  <a href={current.github}>
                    <i>
                      <BsGithub size={40} color={"var(--githubgray)"} />
                    </i>
                  </a>
                </Card.Text>
                <Card.Text className="cardButton">
                  <a href={"mailto:" + current.email}>
                    <i>
                      <AiTwotoneMail size={47} color={"white"} />
                    </i>
                  </a>
                </Card.Text>
                <Card.Text>
                  Employment Status: {employed(current.employed)}{" "}
                </Card.Text>

                <Card.Text className="cardButton">
                  {" "}
                 &nbsp;
                  <a
                    href={`https://hireourgraduates.herokuapp.com/file/get/${current.cv}`}
                    target="_blank"
                  >
                    <i>
                      <Button variant="secondary" size="sm">
                      Download CV <FaFileDownload size={30} color={"white"} />
                      </Button>
                    </i>
                  </a>
                </Card.Text>
                <Container className="updateDelete btn">
                  
                
                  <Button
                    
                    variant="danger"
                    className="remove"
                    onClick={() => removeProfile(current._id)}
                  >
                    Delete<FaTrashAlt size={25}/>
                  </Button>
                 
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    
                    variant="primary"
                    onClick={() => {
                      handleShow();
                      updateTdaProfile(current);
                    }}
                  >
                    Update<FaPenAlt size={25}/>
                  </Button>
                 
                </Container>
              </Container>
            </Collapse>
            <br />

            {/* <Container className="update">
              <Button
                variant="danger"
                className="remove"
                onClick={() => removeProfile(current._id)}
              >
                Delete
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Button
                onClick={() => {
                  handleShow();
                  updateTdaProfile(current);
                }}
              >
                Update
              </Button>
            </Container> */}
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <NavbarComp
        role={props.role}
        logout={props.logout}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      <Nav.Link id="navLinks" onClick={() => props.logout()}></Nav.Link>
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
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} id="studentRows">
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
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
        />
      </Container>
    </>
  );
}
export default TdaDash;
