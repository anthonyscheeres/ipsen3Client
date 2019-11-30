import { Component, OnInit } from '@angular/core';
import { register } from '../services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})




/**
*
* @author Anthony Scheeres
*
*/
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  async registerUser(event) {
    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const email = target.querySelector('#email').value
    await register(username, password, email)

   
  }
}


   









