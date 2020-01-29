import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { hasSuperPermission } from '../services/permission';

import { HttpClient } from "@angular/common/http";
import DataModel from '../models/DataModel';
import {PopupService} from '../popup.service';
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

  constructor(private _router: Router, private http: HttpClient, private popupService: PopupService) { }

  ngOnInit() {
    if(DataModel.account.token == null) {
      this.popupService.dangerPopup("U bent nog niet ingelogd.");
      this._router.navigate(['/']);
    } else {
      hasSuperPermission();
    }
  }

}
