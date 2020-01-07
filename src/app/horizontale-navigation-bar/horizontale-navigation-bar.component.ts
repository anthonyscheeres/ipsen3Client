import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hasSuperPermission, logOut } from '../services/permission';
import { Subscription, interval } from 'rxjs';
import { DataModel } from '../models/DataModel';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})


/**
*
* @author Anthony Scheeres
*
*/
export class NavigationBarComponent implements OnInit {
  condition1 = DataModel.account.hasSuperPermission;
  show: boolean = true;



/**
*
* @author Anthony Scheeres
*
*/
  toggleCollapse() {
    this.show = !this.show
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
