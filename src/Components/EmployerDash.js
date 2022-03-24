import React, { useState, useEffect } from "react";

import SearchAll from "./SearchAll";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Collapse,
  Stack,
  NavLink,
} from "react-bootstrap";

import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";

import "./EmployerDash.css";

import NavbarComp from "./NavbarComp.js";

function EmployerDash(props) {
  const [studentList, cStudentsList] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [open, cOpen] = useState({});
  const [openSearch, setOpenSearch] = useState(false);
  const [fname, cFname] = useState(undefined);

  const refreshList = () => {
    props.client.getProfile().then((response) => cStudentsList(response.data));
  };

  const querySearch = (searchEmp) => {
    props.client
      .queryResult(searchEmp)
      .then((response) => cStudentsList(response.data));
  };

  const collapse = (id) => {
    cOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  

  const icons = (skills, key) => {
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
      if (current.employed === false) {
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
              <Card.Text className="mappedSkills">{icons(current.skills, current._id)}</Card.Text>
              <Stack>
                <Button
                  onClick={() => collapse(current._id)}
                  variant="secondary"
                >
                  Expand
                </Button>
              </Stack>

              <br />
              <Collapse className="extra" in={open[current._id]}>
                <div className="extra">
                  &nbsp; &nbsp;
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
                    <a href={"mailto:" + current.email}>
                      <i>
                        <AiTwotoneMail size={40} color={"white"} />
                      </i>
                    </a>
                  </Card.Text>
                  &nbsp; &nbsp; &nbsp;
                  {/* <Card.Text>"current.cohort"</Card.Text>
            <Card.Text>"current.graduated"</Card.Text> */}
                  <Container className="CV">
                    <Card.Text className="cardButton">
                      {" "}
                      &nbsp;
                      <a
                        href={`http://localhost:3001/file/get/${current.cv}`}
                        target="_blank"
                      >
                        <i>
                          <Button variant="secondary" size="sm">
                          Download CV<FaFileDownload size={30} color={"white"} />
                          </Button>
                        </i>
                      </a>
                    </Card.Text>
                  </Container>
                </div>
              </Collapse>
            </Card>
          </Col>
        );
      }
    });
  };

  return (
    <>
      <NavbarComp
        role={props.role}
        logout={props.logout}
        handleShow={props.handleShow}
        /////
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        ////
      />
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
      </Container>
    </>
  );
}

export default EmployerDash;
