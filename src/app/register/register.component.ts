import { Component, OnInit } from '@angular/core';
import { register } from '../services/user';
import { Router } from '@angular/router';
import { responseR } from '../models/ResponseRequest';

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

  constructor(private _router: Router) { }


  ngOnInit() {
  }
  
}
