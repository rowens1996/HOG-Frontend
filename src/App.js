import React from "react";
import StudentDashboard from "./Components/StudentDashboard";
import EmployerDash from "./Components/EmployerDash";
import TdaDash from "./Components/TdaDash";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route, useNavigate, BrowserRouter} from "react-router-dom";


import { ApiClient } from "./apiClient";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap/";

import { FaUserGraduate } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const [role, cRole] = useState(window.localStorage.getItem("role"));
  const [username, cUsername] = useState(
    window.localStorage.getItem("username")
  );

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    changeToken("");
    cRole("");
    cUsername("");
  };

  const loggedIn = (newToken, newRole, newUser) => {
    window.localStorage.setItem("token", newToken);
    window.localStorage.setItem("role", newRole);
    window.localStorage.setItem("username", newUser);
    changeToken(newToken);
    cRole(newRole);
    cUsername(newUser);
  };

  const client = new ApiClient(token, logout, role, username);

  const roleDash = () => {
    if (role === "Student") {
      return (

        <StudentDashboard username={username} client={client} logout={logout} role={role} />
      );
    } else if (role === "Employer") {
      return <EmployerDash client={client} logout={logout} role={role}  />;
    } else if (role === "TDA") {
      return <TdaDash client={client} logout={logout} role={role}  />;
    } else {
      return <>error no such role</>;
    }
  };

  return (
<>
      <Container id="container">
        <div id="main">
          <div className="background"></div>
          {token ? (
            <>
              {roleDash()}
            </>
          ) : (
            <>
              <Navbar bg="dark" expand="lg">
                <Container id="navLoginContainer">
                  <Navbar.Brand id="header">
                    Hire our Graduates <FaUserGraduate id="gradlogo" />
                  </Navbar.Brand>
                </Container>
              </Navbar>
              <Container id="div">
                <Container id="formBackground" className="flex">
                  <Row>
                    <Col>
                      <Login client={client} loggedIn={loggedIn} />
                    </Col>
                    <Col>
                      <Register client={client} loggedIn={loggedIn} />
                    </Col>
                  </Row>
                  <hr />
                </Container>
              </Container>
            </>
          )}
        </div>
      </Container>
      <footer className="container-fluid bg-5 text-center">
        <p>

          This Website Was Made By Ryan Owens, Abdullah Adaoub, Barnabas Puskas <br />

          Copyright &copy; 2022
        </p>
      </footer>
      </>
  );
}

export default App;
