import axios from "axios";
const url = "http://localhost:3001/";
//const url = "https://hireourgraduates.herokuapp.com/";

export class ApiClient {
  constructor(token, logoutHandler, newRole, newUsername) {
    this.token = token;
    this.logoutHandler = logoutHandler;
    this.role = newRole;
    //Ask about this !!!
    this.username = newUsername;
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
    return this.apiCall("post", `${url}auth`, {
      userName: username,
      password: password,
    });
  }

  addNewUser(username, password, role) {
    return this.authenticatedCall("post", `${url}register`, {
      username: username,
      password: password,
      role: role,
    });
  }

  // ///// employer search
  //   getAllProfiles() {
  //     return this.authenticatedCall("get", `${url}event`);
  //   }
  // //////

  getProfile() {
    return this.authenticatedCall("get", url);
  }

  getUserByName(username) {
    return this.authenticatedCall("get", `${url}user/${username}`);
  }

  getProfileByUser(username) {
    return this.authenticatedCall("get", `${url}profile/${username}`);
  }

  addProfile(
    userName,
    fname,
    lname,
    dob,
    bio,
    course,
    employed,
    linkedin,
    github,
    cv,
    skills
  ) {
    console.log("adding profile");
    return this.authenticatedCall("post", `${url}profile`, {
      userName,
      fname,
      lname,
      dob,
      bio,
      course,
      employed,
      linkedin,
      github,
      cv,
      skills
    });
  }

  removeProfile(username) {
    return this.authenticatedCall("delete", `${url}profile/${username}`);
  }

  updateProfile(
    userName,
    fname,
    lname,
    dob,
    bio,
    course,
    employed,
    linkedin,
    github,
    cv,
    skills
  ) {
    return this.authenticatedCall("put", `${url}profile/${userName}`, {
      userName: userName,
      fname: fname,
      lname: lname,
      dob: dob,
      bio: bio,
      course: course,
      employed: employed,
      linkedin: linkedin,
      github: github,
      cv: cv,
      skills:skills
    });
  }
}
