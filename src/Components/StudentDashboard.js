import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./StudentAdd";
import {
  Navbar,
  Card,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import StudentAdd from "./StudentAdd";

function StudentDashboard(props) {
  const [userProfile, cUserProfile] = useState({
    userName: "",
    fname: "",
    lname: "",
    dob: "",
    bio: "",
    course: "",
    employed: null,
    //skills: Array,
    //date since employment/graduation: String,
    linkedin: "",
    github: "",
    cv: "",

  }
);
  const [current, cCurrent] = useState(undefined);
  const [token, changeToken] = useState(window.localStorage.getItem("token"));

  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken("");
  };

   const refreshList = () => {
    console.log(window.localStorage.getItem("username"))
    props.client.getProfileByUser(window.localStorage.getItem("username")).then((response) => cUserProfile(response.data))
    .then(console.log(userProfile))
   };

   const updateProfile = (userProfile) => {
    cCurrent(userProfile); 
   };

  const buildStudentDash = () => {

    return (
      <>
        {/* <Card>
          <Card.Header as="h5" className="card-header">
            <Card.Title>
              {}
            </Card.Title>
            <Card></Card>

          </Card.Header>
        </Card>*/}

        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title id="title">{userProfile.fname} {userProfile.lname} <br/> {userProfile.userName} </Card.Title>
            <Card.Title id="subtitle">{userProfile.dob} <br/> {userProfile.course}</Card.Title>
            <Card.Text>
              {userProfile.bio}
            </Card.Text>
          </Card.Body>
          {/* skills array? */}
          <ListGroup className="list-group-flush">
            <ListGroupItem>{userProfile.linkedin}</ListGroupItem>
            <ListGroupItem>{userProfile.github}</ListGroupItem>
            <ListGroupItem>{userProfile.cv}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href={userProfile.linkedin}>Linkedin</Card.Link>
            <Card.Link href={userProfile.github}>Github</Card.Link>
          </Card.Body>
        </Card>
      </>
    );
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <Container>
      <StudentAdd
        username={props.username}
        client={props.client}
         refreshList={() => {
           refreshList();
           cCurrent(undefined);
         }}
        currentProfile={current}
        cCurrentProfile={cCurrent}
      />

      {buildStudentDash()}
    </Container>
  );
}

export default StudentDashboard;
