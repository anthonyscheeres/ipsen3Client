import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { login } from '../services/user';
import { responseR } from '../models/ResponseRequest';
import { Router } from '@angular/router';
import { setHasWhatPermission } from '../services/permission';
import DataModel from '../models/DataModel';
import { AccountModel } from '../models/AccountModel';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

/**
*
* @author Anthony Scheeres
*
*/
export class LoginFormComponent implements OnInit {
    this1: string = "";



  constructor(private _router: Router) { }

  ngOnInit() {
  }


  /**
  *
  * @author Anthony Scheeres
  *
  */
  async loginUser(event) {

    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    await login(username, password).then(response => {

      if (response != responseR.fail) {
        DataModel.account.token = response
        localStorage.setItem("token", response)
        setHasWhatPermission();
        this._router.navigate(['/shop']);
        console.log("hasRead"+DataModel.account.hasRead);
      }else this.this1 = "Oops je login informatie klopte niet. Heb je, je email al bevestigd?!"

    })
      ;







  };
}







