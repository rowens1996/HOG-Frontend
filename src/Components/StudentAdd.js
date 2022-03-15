import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, FormCheck, Stack } from "react-bootstrap/";
 import makeAnimated from 'react-select/animated';
import Select from "react-select"

function StudentAdd(props) {
  const [disabled, cDisabled] = useState(false);
  const [skills, cSkills]= useState([])

//   const skillOptions = [
//     { value: 'JS', label: 'Javascript' },
//     { value: 'HTML', label: 'Html' },
//     { value: 'CSS', label: 'CSS' },
//     { value: 'React', label: 'React'},
//     { value: 'MongoDB', label: 'Mongo'}
// ]
const skillOptions = [
  { value: 'JavaScript'},
  { value: 'HTML'},
  { value: 'CSS'},
  { value: 'React'},
  { value: 'MongoDB'}
]
  
const animatedComponents = makeAnimated();
  
  const submitHandler = (e) => {
    e.preventDefault();
    e.persist();
    cDisabled(true);
    // let result;
    // result = props.client.updateProfile(
    //   props.username,
    //   e.target.fname.value,
    //   e.target.lname.value,
    //   e.target.dob.value,
    //   e.target.bio.value,
    //   e.target.course.value,
    //   e.target.employed.checked,
    //   e.target.linkedin.value,
    //   e.target.github.value,
    //   e.target.cv.value,
    //   skills.map( (item) => { return(item.value)}),
    // );

    let result;
    result = props.client.updateProfile(
      props.username,
      e.target.fname.value,
      e.target.lname.value,
      e.target.dob.value,
      e.target.bio.value,
      e.target.course.value,
      e.target.employed.checked,
      e.target.linkedin.value,
      e.target.github.value,
      e.target.cv.value,
      skills.map( (item) => { return(item.value)}),
    );

    result
      .then(() => {
        cDisabled(false);

        e.target.reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an unexpected error occured");
        cDisabled(false);
      });
  };
  /* 
  // cancel event update
  const cancelUpdate = () => {
    props.cCurrentProfile(undefined);
    document.getElementById("addForm").reset();
  };

  // show cancel button
 /*  const showCancelButton = () => {
    return (
      <button
        className="button-28"
        type="button"
        onClick={() => cancelUpdate()}
      >
        {" "}
        Cancel Update{" "}
      </button>
    );
  }; */



const consolelog = () => {
  console.log("rendering the editform");
};
  return (
    <Form onSubmit={(e) => submitHandler(e)} id="addForm">
      {/* {consolelog()} */}
      <Container id="formContainer">
        <Form.Group controlId="fName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            
            type="text"
            defaultValue={props.currentProfile?.fname}
            name="fname"
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group controlId="lName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            
            type="text"
            defaultValue={props.currentProfile?.lname}
            name="lname"
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
           
            type="date"
            defaultValue={props.currentProfile?.dob}
            name="dob"
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
           
            type="text"
            as="textarea"
            rows={5}
            defaultValue={props.currentProfile?.bio}
            name="bio"
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group controlId="course">
          <Form.Label>Developer Academy Course</Form.Label>
          <Form.Select
         className="course"  defaultValue={props.currentProfile?.course}   disabled={disabled}>
        <option value="">Please select a course</option>
        <option value="Sheffield Council 12 week Bootcamp">Sheffield Council 12 week Bootcamp</option>
        <option value="Part-Time Software Development Bootcamp">Part-Time Software Development Bootcamp</option>
        <option value="Part-Time Data Science Bootcamp">Part-Time Data Science Bootcamp</option>
        </Form.Select>
          {/* <Form.Control
          
            id="textInput"
            type="text"
            defaultValue={props.currentProfile?.course}
            name="course"
            disabled={disabled}
          /> */}
        </Form.Group>

        <Form.Text>Are you employed?</Form.Text>
        <Form.Group controlId="registerRole">
          <FormCheck name="employed" type="checkbox" label="I am employed" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicSkills">
                <Form.Label>Skills</Form.Label>
                <Select options={options} defaultValue={options} isMulti />
              </Form.Group> */}


        <Form.Group controlId="linkedIn">
          <Form.Label>linkedin</Form.Label>
          <Form.Control
           
            type="url"
            name="linkedin"
            defaultValue={props.currentProfile?.linkedin}
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group controlId="gitHub">
          <Form.Label>github </Form.Label>
          <Form.Control
            
            type="url"
            name="github"
            defaultValue={props.currentProfile?.github}
            disabled={disabled}
          />
        </Form.Group>
        <Stack gap={2} className="col-md-50 mx-auto">
          <Form.Group controlId="cV">
            <Form.Label>cv</Form.Label>

            <Form.Control
             
              type="text"
              defaultValue={props.currentProfile?.cv}
              name="cv"
              disabled={disabled}
            />
          </Form.Group>

          <Form.Group className="findSelectForm" >
        
        <Form.Label>Skills</Form.Label>
        
        
        <Select
          className="findSelect" 
          onChange={(e)=>{cSkills(e)}}
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={props.currentProfile?.skills}
          isMulti
          options={skillOptions}
          name="skills">
          </Select>
        
        
        </Form.Group>

          <Button variant="primary" type="submit">
            Confirm Updates
          </Button>
        </Stack>
      </Container>
    </Form>
  );
}

export default StudentAdd;
