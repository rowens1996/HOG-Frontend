import React from "react";
import StudentDashboard from "./Components/StudentDashboard";
import { ApiClient } from "./apiClient";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import "./App.css";


function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  

  const logout = () => {
    window.localStorage.removeItem("token")
    changeToken("");
  };

  const loggedIn = (newToken) => {
    window.localStorage.setItem("token", newToken);
    changeToken(newToken);
  };

  const client = new ApiClient(token, logout);

  return (
    <>
      {token ? (
        <StudentDashboard client={client} />
      ) : (
        <div className="login-parent">
          <div className="login-form">
            <Login client={client} loggedIn={loggedIn} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
