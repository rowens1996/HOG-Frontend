import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./StudentAdd"
import {
  Navbar,
  Card,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
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
  }


  const buildStudentDash = () => {
      return(
          <>this is the student dash</>
      )
  }

  useEffect(() => {
    refreshList();
  }, []);


  return (
  <Container>
      {buildStudentDash()}
      <StudentAdd 
       client={props.client}
       refreshList={() => {
         refreshList();
         cCurrent(undefined);
       }}
       currentProfile={current}
       cCurrentProfile={cCurrent}
       

    
      
      />
    </Container>
    );
}

export default StudentDashboard;
