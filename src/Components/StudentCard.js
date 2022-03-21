import React from 'react'
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
  import {BsLinkedin} from "react-icons/bs"
  import {BsGithub} from "react-icons/bs"
  import { AiTwotoneMail } from "react-icons/ai";
    import "./Cat.jpeg"
  import "./StudentCard.css";

export default function StudentCard(props){

const consolelog = () => {
  console.log("rendering card");
};
   
const employed = () => {
  if(props.userProfile.employed){
    return "Employed"
  } else {
    return "Looking for Work"
  }
  
}
    return (
        <Container id="studentProfile">
          {/* {consolelog()}  */}

          {/* <Card>
            <Card.Header as="h5" className="card-header">
              <Card.Title>
                {}
              </Card.Title>
              <Card></Card>
  
            </Card.Header>
          </Card>*/}
           
          <Card className="profileCard">
            
            <Card.Body>

            <Container className = "profilePic">
            
        <Card.Img className= "pic" src="https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2" alt={"placeholder"}/>
        </Container> 
              <Card.Title id="title">
                {props.userProfile.fname} {props.userProfile.lname} <br />{" "}
               {" "}
              </Card.Title>
              <Container className= "Buttons">
              {/* <Button className ="linkedin" href={props.userProfile.linkedin}><BsLinkedin/> LinkedIN</Button>
              &nbsp;
              <Button className ="github" href={props.userProfile.github}><BsGithub/> Github</Button>
              &nbsp;
              <Button className ="email" href={props.userProfile.github}><AiTwotoneMail/> Email</Button> */}
              <a href={props.userProfile.github}><i ><BsGithub size={60} color={"var(--githubgray)"}/></i></a>
              &nbsp;
              &nbsp;
              &nbsp;
              <a href={props.userProfile.github}><i ><BsLinkedin size={60}/></i></a>
              &nbsp;
              &nbsp;
              &nbsp;
              <a href={props.userProfile.github}><i ><AiTwotoneMail size={60} color={"white"}/></i></a>
              </Container>
              <Card.Title className = "bio" > BIO </Card.Title>
              <Card.Text className = "BioText">{props.userProfile.bio}</Card.Text>

              <Card.Title className = "bio" > Deatils </Card.Title>
              <Card.Text className="BioText">
                dob: {props.userProfile.dob} <br /> Courses Completed: {props.userProfile.course.join(", ")} <br /> {props.userProfile.cv} <br/> Employment Status: {employed()}

              </Card.Text>

              <Card.Title className = "bio" > Tech Skills </Card.Title>

              <Card.Text className = "BioText">Skills: {props.userProfile.skills.join(", ")} </Card.Text>

            </Card.Body>
            {/* skills array? */}
            {/* <ListGroup className="list-group-flush">
            <a href={props.userProfile.linkedin}><BsLinkedin/></a>
            {/* <Button>  {userProfile.linkedin} </Button> */}
            {/* <Button> href ={userProfile.linkedin} </Button> */}
            
              {/* <ListGroupItem>{props.userProfile.github}</ListGroupItem>
              <ListGroupItem>{props.userProfile.cv}</ListGroupItem>
            </ListGroup> */} 
            <Button></Button>
          </Card>
        </Container>
      );
}