import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hasSuperPermission, logOut } from '../services/permission';
import { Subscription, interval } from 'rxjs';
import DataModel from '../models/DataModel';
import { VerticalNavigationBarComponent } from '../vertical-navigation-bar/vertical-navigation-bar.component';

@Component({
  selector: 'horizontale-navigation-bar',
  templateUrl: './horizontale-navigation-bar.component.html',
  styleUrls: ['./horizontale-navigation-bar.component.css']
})


/**
*
* @author Anthony Scheeres
*
*/
export class HorizontaleNavigationBarComponent implements OnInit {
  condition1 = false




/**
*
* @author Anthony Scheeres
*
*/
  toggleCollapse() {
   
    DataModel.hiddenHamburger.show = !DataModel.hiddenHamburger.show;
   
  }

  myStyles = {
    'visibility': 'hidden'
  };

  mySubscription: Subscription



/**
*
* @author Anthony Scheeres
*
*/
  initialize() {
    this.checkCurrentPermission();
    this.myStyles = {
      'visibility': 'visible'

    }
    
  }


/**
*
* @author Anthony Scheeres
*
*/
  constructor(private _router: Router) {
    var time = 500
    this.mySubscription = interval(time).subscribe((x => {
      this.initialize();

      //"current show on button is " + this.condition1)
    }));
  }

  checkCurrentPermission() {
    this.condition1 = !DataModel.account.hasSuperPermission;
  }


  ngOnInit() {

  }
  logOut() {
    logOut()
    this._router.navigate(['/']);
  }

}
