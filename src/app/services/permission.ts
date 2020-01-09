
import { ServerModel } from '../models/ServerModel';
import DataModel from '../models/DataModel';
import { fetchPost } from './http.';
import { AccountModel } from '../models/AccountModel';


/**
*
* @author Anthony Scheeres
*
*/
export function hasDelete() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/" + token + "/hasDelete";
  var data = null




  return fetchPost(url);
}

/**
*
* @author Anthony Scheeres
*
*/
export function hasAdmin() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/" + token + "/hasAdmin";
  return fetchPost(url);
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasWrite() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/" + token + "/hasWrite";






  return fetchPost(url);
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasRead() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token
  var url = "http://" + host + ":" + port + "/user/"+ token+"/hasRead";




  return fetchPost(url);
}


function hasPermissionFromResponse(response: String) {
  return response.toLocaleLowerCase() === "true"
}


/**
*
* @author Anthony Scheeres
*
*/
export async function setHasRead() {
  var variable = "hasRead"
  await hasRead().then(response => {

    if (hasPermissionFromResponse(response)) {

      localStorage.setItem(variable, response);
      return DataModel.account.hasRead = true;
    }

    localStorage.setItem(variable, "false");
    DataModel.account.hasRead = false;
  })
}


/**
*
* @author Anthony Scheeres
*
*/
export async function setHasWrite() {
  var variable = "hasWrite"
  await hasWrite().then(response => {

    if (hasPermissionFromResponse(response)) {

      localStorage.setItem(variable, response)
      return DataModel.account.hasWrite = true
    }

    localStorage.setItem(variable, "false")
    DataModel.account.hasWrite = false
  })
}

/**
*
* @author Anthony Scheeres
*
*/
export async function setHasDelete() {
  var variable = "hasDelete"
  await hasDelete().then(response => {

    if (hasPermissionFromResponse(response)) {


      localStorage.setItem(variable, response)
      return DataModel.account.hasDelete = true
    }

    localStorage.setItem(variable, "false")
    DataModel.account.hasDelete = false
  })

  

}


/**
*
* @author Anthony Scheeres
*
*/
export function logOut() {
  DataModel.account = new AccountModel();
 nullToken()
  nullHasWrite()
  nullHasDelete()
  nullHasRead()
  nullHasSuperPermission() 
}

export async function nullHasSuperPermission() {
  DataModel.account.hasSuperPermission = null

  localStorage.setItem("hasSuperPermission", null)
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullToken() {
  DataModel.account.token = null

  localStorage.setItem("token", null)
}


/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasWrite() {
  DataModel.account.hasWrite = null

  localStorage.setItem("hasWrite", null)
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasDelete() {
  DataModel.account.hasDelete = false

  localStorage.setItem("hasDelete", null)
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasRead() {
  DataModel.account.hasRead = false

  localStorage.setItem("hasRead", null)
}



/**
*
* @author Anthony Scheeres
*
*/
export async function setHasWhatPermission() {
  setHasWrite()
  setHasDelete()
  setHasRead()
}

function checkInput(val){
  return val == null || val === false
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasSuperPermission() {

  let result: boolean = false
  var delet = DataModel.account.hasDelete;
  var read = DataModel.account.hasRead;
  var write = DataModel.account.hasWrite;

  result = delet && read && write;
  var val;
  console.log("hasRead: " + DataModel.account.hasRead);
  if (checkInput(val)) {
    localStorage.setItem("hasSuperPermission", "false")
    DataModel.account.hasSuperPermission = false;
  }

  if (!result) {

  }
  localStorage.setItem("hasSuperPermission", "true")
  DataModel.account.hasSuperPermission = result;
  return result
}

