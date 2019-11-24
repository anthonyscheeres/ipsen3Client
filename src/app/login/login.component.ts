import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


/**
*
* @author Anthony Scheeres
*
*/
export class LoginComponent implements OnInit {
  static  token: String;
  constructor() {

  }

  get token(): String {
    return this.token;
  }
  set token(value: String) {
    this.token = value;
  }


  ngOnInit() {
  }

 


/**
*
* @author Anthony Scheeres
*
*/
  loginUser(event){
    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    var xhr = new XMLHttpRequest();
    var host = "localhost"
    var port = "8080"
    var url = "http://" + host + ":" + port + "/user/login";

    var data = JSON.stringify({
      "username": username,
      "password": password,
      "id": null,
      "permission": null,
      "email": null
    });
 

    xhr.onreadystatechange = function () { /* .. */ };
    xhr.open("POST", url);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data.toString());
    this.token = xhr.responseText;
    console.log(this.token);
  }
}


