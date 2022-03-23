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
  NavLink

} from "react-bootstrap";

import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";

import "./EmployerDash.css";


import NavbarComp from "./NavbarComp.js";



function EmployerDash(props) {
  const [studentList, cStudentsList] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [fname, cFname] = useState(undefined);

  


  const refreshList = () => {
    props.client.getProfile().then((response) => cStudentsList(response.data));
  };

  const querySearch = (searchEmp) => {
    props.client.queryResult(searchEmp).then((response) => cStudentsList(response.data))
  }

//Search by first name
  // const getByFname = (fnam) => {
  //   props.client.getByFname(fnam).then((response) => cStudentsList(response.data));
  // };


  // const handleExpandClick = () => {
  //   setOpen(!open)
  // };

  // const expnadProfile = (id, expand)=>{
    
  //   const expanded = studentList.map((profile)=>{
  //     if (profile._id===id){
  //       if (expand){
  //         return {id, count: profile.count+1}
  //       }
  //     }
  //     return profile
      
  //   })
  //   cStudentsList(expanded)
   
  // }
  // const expandProfile = (id)=>{
  //   const expand = studentList.map((current)=>{
  //     if (current._id===id){
  //       return (setOpen(true))


  //     } 
  //   })
  //   setOpen(expand)
  // }

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
              <Card.Title as="h6">Location{current.location}</Card.Title>
            </Card.Header>
            <br />
            <Card.Text>{current.course}</Card.Text>
            <Card.Text>{current.skills.join("   ")}</Card.Text>
            <Stack>
             
            <Button
              variant = "secondary"
              
              onClick={() =>  setOpen(!open)}
              aria-controls="example-collapse-text"
              //aria-expanded={open}
            >
              
              Expand Profile
              
            </Button>
            </Stack>

            <br/>
            <Collapse className = "extra" in={open} >
            
              
              <div className="extra" >
              
              
              
          
           
              
            &nbsp;
            &nbsp;
            
            <Card.Text className="cardButton">
            <a href={current.linkedin}><i ><BsLinkedin size={40}/></i></a>
            </Card.Text>
          
            &nbsp;
            &nbsp;
            &nbsp;
            <Card.Text className="cardButton">
            <a href={current.github}><i ><BsGithub size={40} color={"var(--githubgray)"}/></i></a>
            </Card.Text>
          
            &nbsp;
            &nbsp;
            &nbsp;
            <Card.Text className="cardButton">
            <a href={current.email}><i ><AiTwotoneMail size={40} color={"white"}/></i></a>
            </Card.Text>
           <Container className = "Other">
            <Card.Text>"current.cohort"</Card.Text>
            <Card.Text>"current.graduated"</Card.Text>
            <Card.Text className="cardButton">
              <a href={`http://localhost:3001/file/get/${current.cv}`} target="_blank">
                <Button size="sm" variant="success">
                  Download CV
                </Button>
              </a>

            </Card.Text>
            </Container>
              </div>
            </Collapse>
           
            </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <NavbarComp role={props.role} logout={props.logout} handleShow={props.handleShow}/>

    
      
   

      <Container>
        <Row xs={1} sm={2} md={3} lg={4} id="studentRows">
          {buildCards()}
        </Row>
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

export default EmployerDash;
