import React, { useState, useEffect } from "react";
import "./StudentAdd";
import  StudentCard from "./StudentCard"
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  Button
} from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import {BsLinkedin} from "react-icons/bs"


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
    course: "",
    employed: null,
    skills: [],
    //date since employment/graduation: String,
    linkedin: "",
    github: "",
    cv: "",
  });
  const [current, cCurrent] = useState(undefined);

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

  // const buildStudentDash = () => {
  //   return (
  //     <Container id="studentProfile">
  //       {/* <Card>
  //         <Card.Header as="h5" className="card-header">
  //           <Card.Title>
  //             {}
  //           </Card.Title>
  //           <Card></Card>

  //         </Card.Header>
  //       </Card>*/}

  //       <Card id="profileCard" style={{ width: "100%" }}>
  //         <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
  //         <Card.Body>
  //           <Card.Title id="title">
  //             {userProfile.fname} {userProfile.lname} <br />{" "}
  //             {userProfile.userName}{" "}
  //           </Card.Title>
  //           <Card.Title id="subtitle">
  //             {userProfile.dob} <br /> {userProfile.course}
  //           </Card.Title>
  //           <Card.Text>{userProfile.bio}</Card.Text>
  //         </Card.Body>
  //         {/* skills array? */}
  //         <ListGroup className="list-group-flush">
  //         <a href={userProfile.linkedin}><BsLinkedin/></a>
  //         {/* <Button>  {userProfile.linkedin} </Button> */}
  //         {/* <Button> href ={userProfile.linkedin} </Button> */}
          
  //           <ListGroupItem>{userProfile.github}</ListGroupItem>
  //           <ListGroupItem>{userProfile.cv}</ListGroupItem>
  //         </ListGroup>
  //         <Card.Body>
  //           <Card.Link href={userProfile.linkedin}>Linkedin</Card.Link>
  //           <Card.Link href={userProfile.github}>Github</Card.Link>
  //         </Card.Body>
  //       </Card>
  //     </Container>
  //   );
  // };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

<<<<<<< HEAD
  const buildCards = () => {
    return studentList.map((something) => {
      return (
        <div key={something._id}>
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title id="title">
                {something.fname} {something.lname} <br /> {something.userName}{" "}
              </Card.Title>
              <Card.Title id="subtitle">
                {something.dob} <br /> {something.course}
              </Card.Title>
              <Card.Text>{something.bio}</Card.Text>
            </Card.Body>
            {/* skills array? */}
            <ListGroup className="list-group-flush">
              <ListGroupItem>{something.linkedin}</ListGroupItem>
              <ListGroupItem>{something.github}</ListGroupItem>
              <ListGroupItem>{something.cv}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href={something.linkedin}>Linkedin</Card.Link>
              <Card.Link href={something.github}>Github</Card.Link>
            </Card.Body>
          </Card>
        </div>
      );
    });
=======
  const consolelog = () => {
    console.log("rendering the studentdash");
>>>>>>> b8ce13f9e8525916e725265bfffa6620ee77972d
  };


  return (
<<<<<<< HEAD
    // <Container id="Dash">
    //   <Navbar bg="dark" expand="lg">
    //     <Container id="navContainer">
    //       <NavItem>
    //         <Navbar.Brand id="header">
    //           Hire our Graduates <FaUserGraduate id="gradlogo" />
    //         </Navbar.Brand>
    //         <Nav.Item id="pageTitle">Student Dashboard</Nav.Item>
    //       </NavItem>
    //       <NavItem id="flex-horizontal">
    //         <Nav.Link id="navLinks" onClick={() => props.logOut()}>
    //           Logout
    //         </Nav.Link>
    //       </NavItem>
    //     </Container>
    //   </Navbar>
    <>
    <NavbarComp role={props.role}/>
      <Container>
        {buildCards()}
      </Container>
=======
    <Container id="Dash">
      {/* {consolelog()} */}
      <Navbar bg="dark" expand="lg">
        <Container id="navContainer">
          <NavItem>
            <Navbar.Brand id="header">
              Hire our Graduates <FaUserGraduate id="gradlogo" />
            </Navbar.Brand>
            <Nav.Item id="pageTitle">Student Dashboard</Nav.Item>
          </NavItem>
          <NavItem id="flex-horizontal">
            <Nav.Link id="navLinks" onClick={() => props.logOut()}>
              Logout
            </Nav.Link>
          </NavItem>
        </Container>
      </Navbar>
>>>>>>> b8ce13f9e8525916e725265bfffa6620ee77972d
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
      <br/>
<<<<<<< HEAD
      {buildStudentDash()}
    </>
    
=======
      <StudentCard
        userProfile = {userProfile}
      />
      {/* {buildStudentDash()} */}

      
    </Container>
>>>>>>> b8ce13f9e8525916e725265bfffa6620ee77972d
  );
}


export default StudentDashboard;
