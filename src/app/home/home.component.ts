import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { hasSuperPermission } from '../services/permission';

import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
*
* @author Anthony Scheeres
*
*/
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    hasSuperPermission();
  }

}
