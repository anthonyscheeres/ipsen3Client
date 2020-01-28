import { Component, OnInit, DoCheck } from '@angular/core';
import DataModel from './models/DataModel';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{

  title = 'TestlabWeb';
  showThis1: boolean = false;
  showThis: boolean = false;
  mySubscription: Subscription;
  myStyles = {
    'visibility': 'hidden'

  };

  loggedIn;


  constructor(private _router: Router) {
    var time = 500
    this.mySubscription = interval(time).subscribe((x => {
      this.doStuff();
    }));
  }

  ngOnInit() {
    this.loggedIn = DataModel.account.token != null;
  }

  ngDoCheck() {
    this.loggedIn = DataModel.account.token != null;
  }

  doStuff() {
    this.checkCurrentPermission();

    this.showThis = DataModel.hiddenHamburger.show

    this.myStyles = {
      'visibility': 'visible'

    }
  }

  checkCurrentPermission() {
    this.showThis1 = DataModel.account.token != "null" && DataModel.account.token!=null;
  }

}



