import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

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
        <div key={something._id}>
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title id="title">
                {something.fname} {something.lname} <br />{" "}
                {something.userName}{" "}
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
  };

  return (
  <Container>
  <>EmployerDash</>
    {buildCards()}
  </Container>)
}

export default EmployerDash;
