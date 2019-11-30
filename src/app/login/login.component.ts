import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/AccountModel';
import { login } from '../services/user';
import { responseR } from '../models/ResponseRequest';
import { Router } from '@angular/router';


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
  constructor(private _router: Router) { }



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


  
    await login(username, password).then(response => {
     
      if (response != responseR.fail) {
        AccountModel.token = response

      }
    });







    };

  
  }



