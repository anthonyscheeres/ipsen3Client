
import { ServerModel } from '../models/ServerModel';
import { responseR } from '../models/ResponseRequest';
import { fetchJsonPost, fetchJsonGet } from './http.';
import {UserModel} from "../models/UserModel";
import {UserRole} from "../models/UserRole";
import DataModel from '../models/DataModel';
import { ProtocolR } from '../models/Protocol';

export function loadUsers() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
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

  // @ts-ignore
  return fetchJsonPost(url, data.toString(), ProtocolR.POST);

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


  // @ts-ignore
  return fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

}

export function getUsers() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/user/"+ token + "/showAllUsers";
  return url;
}

export function deleteUser() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/user/" + token + "/removeUser";
  return url;
}

export function getRoleUser() {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/user/" + token + "/getUserRole";
  return url;

}

export function updateUserRole(id: number, role: UserRole) {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/user/" + token + "/" + id + "/" + role + "/updateUserRole";
  return url;
}
