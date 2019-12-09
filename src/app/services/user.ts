
import { ServerModel } from '../models/ServerModel';
import { responseR } from '../models/ResponseRequest';
import { AccountModel } from '../models/AccountModel';
import { fetchJsonPost, fetchJsonGet } from './http.';
import {UserModel} from "../models/UserModel";

export function loadUsers() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;
  var url = "http://" + host + ":" + port + "/user/"+ token + "/showAllUsers";
  return url
}



export function login(username, password) {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var url = "http://" + host + ":" + port + "/user/login";

  var data = JSON.stringify({
    "username": username,
    "password": password,
    "id": null,
    "permission": null,
    "email": null
  });




  return fetchJsonPost(url, data.toString());




}


export function register(username, password, email) {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var urlToServer = "http://" + host + ":" + port + "/user/createUser";

  var data = JSON.stringify({
    "username": username,
    "password": password,
    "id": null,
    "permission": null,
    "email": email
  });


  return fetchJsonPost(urlToServer, data.toString())

}

export function getUsers() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;
  var url = "http://" + host + ":" + port + "/user" + "/" + token + "/showAllUsers";

  return url;
}
