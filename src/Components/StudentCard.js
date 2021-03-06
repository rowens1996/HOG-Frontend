import React, { useEffect } from "react";
import { useState } from "react";
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
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";

import "./StudentCard.css";

export default function StudentCard(props) {
  const consolelog = () => {
    console.log(props.userProfile.avatar);
    // console.log("rendering card");
  };

  const employed = () => {
    if (props.userProfile.employed) {
      return "Employed";
    } else {
      return "Looking for Work";
    }
  };

  const icons = () => {
    let skillIcons = [];
    if (props.userProfile.skills.includes("CSS")) {
      skillIcons.push(<FaCss3Alt size={60} color={"#264de4"} />);
    }
    if (props.userProfile.skills.includes("React")) {
      skillIcons.push(<FaReact size={60} color={"#61DBFB"} />);
    }
    if (props.userProfile.skills.includes("HTML")) {
      skillIcons.push(<FaHtml5 size={60} color={" #E34C26"} />);
    }
    if (props.userProfile.skills.includes("MongoDB")) {
      skillIcons.push(<SiMongodb size={60} color={"#3FA037"} />);
    }
    if (props.userProfile.skills.includes("JS")) {
      skillIcons.push(<SiJavascript size={60} color={"#F0DB4F"} />);
    }

    let ico = skillIcons.map((item) => {
      return item;
    });
    return ico;
  };

  const pdfLink = `https://hireourgraduates.herokuapp.com/file/get/${props.userProfile.cv}`;

  return (
    <Container id="studentProfile">
      {/* {consolelog()}  */}
      <Card className="profileCard">
        <Card.Body>
          <Container className="profilePic">
            <Card.Img
              id="pic"
              className="pic"
              src={`https://hireourgraduates.herokuapp.com/file/get/${props.userProfile.avatar}`}
            />
          </Container>
          <Card.Title id="title">
            {props.userProfile.fname} {props.userProfile.lname} <br />{" "}
          </Card.Title>
          <Container className="Buttons">
            {/* <Button className ="linkedin" href={props.userProfile.linkedin}><BsLinkedin/> LinkedIN</Button>
              &nbsp;
              <Button className ="github" href={props.userProfile.github}><BsGithub/> Github</Button>
              &nbsp;
              <Button className ="email" href={props.userProfile.github}><AiTwotoneMail/> Email</Button> */}
            <a href={props.userProfile.github}>
              <i>
                <BsGithub
                  className={"githubStudentDash"}
                  size={60}
                  color={"var(--githubgray)"}
                />
              </i>
            </a>
            &nbsp; &nbsp; &nbsp;
            <a href={props.userProfile.linkedin}>
              <i>
                <BsLinkedin className={"linkedinStudentDash"} size={60} />
              </i>
            </a>
            &nbsp; &nbsp; &nbsp;
            <a href={"mailto:" + props.userProfile.email}>
              <i>
                <AiTwotoneMail
                  className={"emailStudentDash"}
                  size={75}
                  color={"white"}
                />
              </i>
            </a>
          </Container>
          <Card.Title className="bio"> BIO </Card.Title>
          <Card.Text className="BioText">{props.userProfile.bio}</Card.Text>

          <Card.Title className="bio"> Deatils </Card.Title>
          <Card.Text className="BioText">
            DOB : {props.userProfile.dob} <br /> <br /> Courses Completed :{" "}
            {props.userProfile.course.join(", ")}
            <br /> <br /> Employment Status : {employed()}
            <br /> <br /> Location : {props.userProfile.location}
          </Card.Text>
          <Nav.Link href={pdfLink}>Preview CV</Nav.Link>
          <Card.Title className="bio"> Tech Skills </Card.Title>

          {/* <Card.Text className="BioText">
  
            Skills: {props.userProfile.skills.join("  ")}{" "}
          </Card.Text> */}

          <Card.Text className="BioText">{icons()}</Card.Text>
        </Card.Body>
        {/* skills array? */}
        {/* <ListGroup className="list-group-flush">

            <a href={props.userProfile.linkedin}><BsLinkedin/></a>
            {/* <Button>  {userProfile.linkedin} </Button> */}
        {/* <Button> href ={userProfile.linkedin} </Button> */}

        {/* <ListGroupItem>{props.userProfile.github}</ListGroupItem>
              <ListGroupItem>{props.userProfile.cv}</ListGroupItem>
            </ListGroup> */}
      </Card>
    </Container>
  );
}
