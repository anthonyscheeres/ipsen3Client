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
  condition1 = DataModel.account.hasRead;




/**
*
* @author Anthony Scheeres
*
*/
  toggleCollapse() {
    var e = DataModel.hiddenHamburger.show

    e = !e;
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
  doStuff() {
    this.checkCurrentPermission();
    this.myStyles = {
      'visibility': 'visible'

    }
    
  }

  constructor(private _router: Router) {
    var time = 500
    this.mySubscription = interval(time).subscribe((x => {
      this.doStuff();
    }));
  }

  checkCurrentPermission() {
    this.condition1 = !DataModel.account.hasSuperPermission;
    //   console.log(DataModel.account.hasSuperPermission)
  }


  ngOnInit() {

  }
  logOut() {
    logOut()
    this._router.navigate(['/']);
  }

}
