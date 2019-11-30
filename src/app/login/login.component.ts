import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/AccountModel';
import { login } from '../services/user';
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
  constructor() {

  }



  ngOnInit() {
  }

 


/**
*
* @author Anthony Scheeres
*
*/
  async loginUser(event){
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
 
 
  
    await login(username, password).then(response => {
     
      if (response != responseR.fail) {
        AccountModel.token = response

      }
    });







    };

  
  }



