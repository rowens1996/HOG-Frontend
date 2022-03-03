import axios from "axios";
const url = "http://localhost:3001/";
//const url = "https://rowens96-events-app.herokuapp.com/";

export class ApiClient {
  constructor(token, logoutHandler) {
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  apiCall(method, url, data) {
    console.log(url);

    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token,
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject;
      } else {
        throw error;
      }
    });
  }

  login(username, password) {
    // console.log("username",username)
    // console.log("password",password)
    return this.apiCall("post", `${url}auth`, {
      userName: username,
      password: password,
    });
  }


  addNewUser(username, password) {
    return this.authenticatedCall("post", `${url}register`, { username, password});
  };

// ///// employer search 
//   getAllProfiles() {
//     return this.authenticatedCall("get", `${url}event`);
//   }
// //////

  getProfileById(userId) {
    return this.authenticatedCall("get", `${url}search/id/${userId}`);
  }

  getProfileByName(name) {
    return this.authenticatedCall("get", `${url}search/name/${name}`);
  }

  addProfile(userId, fname, lname, age, bio, linkedin, github, cv) {
    return this.authenticatedCall("post", `${url}profile`, {
      userId,
      fname,
      lname,
      age,
      bio,
      linkedin,
      github,
      cv,
    });
  }

  removeProfile(userId) {
    return this.authenticatedCall("delete", `${url}event/${userId}`);
  }

  updateProfile(userId, fname, lname, age, bio, linkedin, github, cv) {
    return this.authenticatedCall("put", `${url}event/${userId}`, {
      fname: fname,
      lname: lname,
      age: age,
      bio: bio,
      linkedin: linkedin,
      github: github,
      cv: cv
    });
  }
}
