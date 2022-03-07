import React from "react";
import StudentDashboard from "./Components/StudentDashboard";
import EmployerDash from "./Components/employerDash";
import { ApiClient } from "./apiClient";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";
import { Button, Container } from "react-bootstrap/"



function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const [role, changeRole] = useState(window.localStorage.getItem("role"));
  

  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("role");
    changeToken("");
    changeRole("");
  };

  const loggedIn = (newToken, newRole) => {
    window.localStorage.setItem("token", newToken);
    window.localStorage.setItem("role", newRole);
    changeToken(newToken);
    changeRole(newRole)
  };

  const client = new ApiClient(token, role, logout);

  const roleDash = () => {
if (role==="student"){
  return(
  <StudentDashboard client={client} logOut={logout} />
  )
} else if(role==="employer") {
  return(
  <EmployerDash client={client} logOut={logout} />
  )} else {
  return(
    <>error no such role</>
  )
}
  }

  return (
    <>
      {token ? (
        <>
        
         <Button variant="secondary" onClick={() => logout()}>
           Logout
        </Button>
        {roleDash()}
        </>
      ) : (
        <Container>
            <Login client={client} loggedIn={loggedIn} />
            <hr/>
            <Register client={client} loggedIn={loggedIn} />
        </Container>
      )}
    </>
  );
}

export default App;
