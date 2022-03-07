import axios from "axios";
const url = "http://localhost:3001/";
//const url = "https://rowens96-events-app.herokuapp.com/";

export class ApiClient {
  constructor(token, logoutHandler, newRole) {
    this.token = token;
    this.logoutHandler = logoutHandler;
    this.role= newRole;
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

  // register(username, password, role){
  //   return this.apiCall("post",`${url}register`,{
  //     userName: username,
  //     password: password,
  //     role: role
  //   })
  // }


  addNewUser(username, password, role) {
    return this.authenticatedCall("post", `${url}register`, { username, password, role});
  };

// ///// employer search 
//   getAllProfiles() {
//     return this.authenticatedCall("get", `${url}event`);
//   }
// //////

getProfile() {
  return this.authenticatedCall("get", url);
}

  getProfileById(id) {
    return this.authenticatedCall("get", `${url}search/id/${id}`);
  }

  getProfileByName(name) {
    return this.authenticatedCall("get", `${url}search/name/${name}`);
  }

  addProfile( fname, lname, age, bio, linkedin, github, cv) {
    console.log("adding profile")
    return this.authenticatedCall("post", `${url}profile`, {
      
      fname,
      lname,
      age,
      bio,
      linkedin,
      github,
      cv,
    });
  }

  removeProfile(id) {
    return this.authenticatedCall("delete", `${url}event/${id}`);
  }

  updateProfile( id, fname, lname, age, bio, linkedin, github, cv) {
    return this.authenticatedCall("put", `${url}event/${id}`, {
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
