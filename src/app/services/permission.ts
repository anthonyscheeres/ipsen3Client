import { fetchJsonPost, fetchPost } from './http';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { AccountModel } from '../models/AccountModel';

export function hasDelete() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/" + token + "/hasDelete";
  var data = null




  return fetchPost(url);
}

export function hasWrite() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/" + token + "/hasWrite";






  return fetchPost(url);
}

export function hasRead() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/"+ token+"/hasRead";




  return fetchPost(url);
}

export async function setHasRead() {
  var variable = "hasRead"
  await hasRead().then(response => {

    if (response.toLocaleLowerCase() === "true") {

      localStorage.setItem(variable, response);
      return DataModel.account.hasRead = true;
    }

    localStorage.setItem(variable, "false");
    DataModel.account.hasRead = false;
  })
}

export async function setHasWrite() {
  var variable = "hasWrite"
  await hasWrite().then(response => {

    if (response.toLocaleLowerCase() === "true") {

      localStorage.setItem(variable, response)
      return DataModel.account.hasWrite = true
    }

    localStorage.setItem(variable, "false")
    DataModel.account.hasWrite = false
  })
}
export async function setHasDelete() {
  var variable = "hasDelete"
  await hasDelete().then(response => {

    if (response.toLocaleLowerCase() === "true") {

      localStorage.setItem(variable, response)
      return DataModel.account.hasDelete = true
    }

    localStorage.setItem(variable, "false")
    DataModel.account.hasDelete = false
  })

  

}

export function logOut() {
  DataModel.account = new AccountModel();
/*  nullToken()
  nullHasWrite()
  nullHasDelete()
  nullHasRead()
  nullHasSuperPermission() */
}

export async function nullHasSuperPermission() {
  DataModel.account.hasSuperPermission = null

  localStorage.setItem("hasSuperPermission", null)
}

export async function nullToken() {
  DataModel.account.token = null

  localStorage.setItem("token", null)
}



export async function nullHasWrite() {
  DataModel.account.hasWrite = null

  localStorage.setItem("hasWrite", null)
}

export async function nullHasDelete() {
  DataModel.account.hasDelete = false

  localStorage.setItem("hasDelete", null)
}

export async function nullHasRead() {
  DataModel.account.hasRead = false

  localStorage.setItem("hasRead", null)
}




export async function setHasWhatPermission() {
  setHasWrite()
  setHasDelete()
  setHasRead()
}

export function hasSuperPermission() {
  var result = false;
  var delet = DataModel.account.hasDelete;
  var read = DataModel.account.hasRead;
  var write = DataModel.account.hasWrite;

  console.log(delet)
  console.log(read)
  console.log(write)
  var result = delet && read && write
  var val;
  console.log("hasSuperPermission" +result)

  if (val == null || val === false) {
    localStorage.setItem("hasSuperPermission", "false")
    DataModel.account.hasSuperPermission = false;
  }

  if (!result) {

  }
  localStorage.setItem("hasSuperPermission", "true")
  DataModel.account.hasSuperPermission = result;
  return result
}

