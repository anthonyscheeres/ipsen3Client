import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import DataModel from '../models/DataModel';


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
    if(DataModel.account.token != null) {
      this._router.navigate(['/dashboard']);
    }
  }





  }



