import { Component, OnInit } from '@angular/core';
import { sendHttpRequest } from '../services/http.component';
import { ServerModel } from '../models/ServerModel';
import { ResponseRequest } from '../models/ResponseRequest';
import { Router } from "@angular/router";

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
    return LoginComponent.token;
  }
  set token(value: String) {
    LoginComponent.token = value;
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
    var host = ServerModel.host
    var port = ServerModel.port
    var url = "http://" + host + ":" + port + "/user/login";

    var data = JSON.stringify({
      "username": username,
      "password": password,
      "id": null,
      "permission": null,
      "email": null
    });
 
 
  
    sendHttpRequest(url, data.toString()).then(response => {
      console.log("response : " + response);
      if (response!=ResponseRequest.fail) {
        LoginComponent.token = response
        
      }

    });







    };

  
  }



