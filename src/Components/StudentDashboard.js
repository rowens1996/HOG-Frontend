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
  ListGroupItem

} from "react-bootstrap";
import StudentAdd from "./StudentAdd";
function StudentDashboard(props) {
  const [userProfile, cUserProfile] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [token, changeToken] = useState(window.localStorage.getItem("token"));

  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken("");
  };

  const refreshList = () => {
    props.client.getProfile().then((response) => cUserProfile(response.data));
  };

  const updateProfile = (event) => {
    cCurrent(event);
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


<Card style={{ width: '100%' }}>
  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
  <Card.Body>
    <Card.Title>Info</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Linkedin</Card.Link>
    <Card.Link href="#">Github</Card.Link>
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
