import { Component } from '@angular/core';
import DataModel from './models/DataModel';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestlabWeb';
  show: boolean =false
  mySubscription: Subscription
  myStyles = {
    'visibility': 'hidden'

  };
 



  constructor(private _router: Router) {
    var time = 500
    this.mySubscription = interval(time).subscribe((x => {
      this.doStuff();
    }));
  }

  ngOnInit() {
  }



  doStuff() {
    this.checkCurrentPermission();

    this.show = DataModel.hiddenHamburger.show

    this.myStyles = {
      'visibility': 'visible'

    }
  }
  checkCurrentPermission() {
    this.show = !DataModel.account.hasRead;
  }
}



