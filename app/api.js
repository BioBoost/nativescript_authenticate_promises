// Promises:
// - https://javascript.info/promise-basics
// - https://scotch.io/tutorials/javascript-promises-for-dummies

const httpModule = require("http");
const API = "https://todoes-nico.herokuapp.com";

exports.authenticate = function(email, password) {
  var requestOptions = {
    url: API + "/authenticate",
    content: JSON.stringify({
      email: email,
      password: password
    })
  };

  // returns promise
  return post(requestOptions).then(getAuthToken);
}

var getAuthToken = function(jsonResponse) {
  if (jsonResponse.hasOwnProperty("auth_token")) {
    return Promise.resolve(jsonResponse.auth_token);
  }
  else {
    return Promise.reject(new Error("Auth failed, no token"));
  }
};

function post(request) {
  // We return the actual promise! (I think)
  return httpModule
  .request(
    Object.assign({
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, request)
  )
  .then(function(response) {
    var json = response.content.toJSON();
    return Promise.resolve(json);
  })
}