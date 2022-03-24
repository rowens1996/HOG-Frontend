import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./SearchAll.css"

function SearchAll(props) {
  const [open, setOpen] = useState(false)
  const [disabled, cDisabled] = useState(false);
  const [skills, cSkills] = useState([]);
   const animatedComponents = makeAnimated();
  const skillOptions = [
    { value: "JS", label: "Javascript" },
    { value: "HTML", label: "Html" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "MongoDB", label: "Mongo" }
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    const search = {
      Firstname: e.target.Firstname.value,
      Lastname: e.target.Lastname.value,
    
      //sCourse: e.target.sCourse.value,
      sCourse: e.target.sCourse.value,
      sSkills: skills.map((item) => item.value),
    };
    props.querySearch(search);
  };

  const showAll = () => {
    props.refreshList();
    //resetName();
    //resetLocation();
  };

  return (
    <>
    
    <br/>  <br/>  
    <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Search Profiles
      </Button>
      <Collapse in={open}>
      <Container className="mx-auto formContainer">
        <br/> <br/> 
        
        <br />
        <Form
          className="form2"
          onSubmit={(e) => submitHandler(e)}
          id="findForm"
        >
          <Form.Group>
            <Form.Label className="fname">First name:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.currentProfile?.Firstname}
              name="Firstname"
              disabled={disabled}
              placeholder="Participant's first name"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="fname">Last name:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.currentProfile?.Lastname}
              name="Lastname"
              disabled={disabled}
              placeholder="Participant's last name"
            ></Form.Control>
          </Form.Group>
         
          <Form.Group>
            <Form.Label>Course:</Form.Label>
            <Form.Select id="sCourse" name="sCourse">
              <option value="">Please select a course</option>
              <option value="Web Development 12 week Bootcamp">
              Web Development 12 week Bootcamp
              </option>
              <option value="Part-Time Web Development Bootcamp">
              Part-Time Web Development Bootcamp
              </option>
              <option value="Part-Time Data Science Bootcamp">
              Part-Time Data Science Bootcamp
              </option>
              <option value="Game Development Bootcamp">
              Game Development Bootcamp
              </option>
              <option value="Network Engineering Bootcamp">
              Network Engineering Bootcamp
              </option>
            </Form.Select>
          </Form.Group>
     
         
          <Form.Group className="findSelectForm">
            <Form.Label>Skills</Form.Label>
            <Select
              className="findSelect"
              onChange={(e) => {
                cSkills(e);
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={props.currentProfile?.sSkills}
              isMulti
              options={skillOptions}
              name="sSkills"
            ></Select>
          </Form.Group>
          <br />
          <Container className = "Buttons">
          <Button
            variant="primary"
            
            type="submit"
            disabled={disabled}
          >
            {" "}
            Search{" "}
          </Button>
          &nbsp;
            &nbsp;
          <Button 
          variant="secondary"
          onClick={() => showAll()}>
              {" "}
              Show All{" "}
            </Button>
            </Container>
        </Form>
      </Container>
      </Collapse>
     
    
    
    </>
  );
}

export default SearchAll;
