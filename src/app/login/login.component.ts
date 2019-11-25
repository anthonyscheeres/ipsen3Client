import { Component, OnInit } from '@angular/core';
import { sendHttpRequest } from '../services/http.component';
import { ServerModel } from '../models/ServerModel';
import { Router } from "@angular/router";
import { responseR } from '../models/ResponseRequest';

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
  static token: String;

  constructor(private router: Router) { }

 

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
      if (response!=responseR.fail) {
        LoginComponent.token = response
        
      }

    });

    };

  
  }

