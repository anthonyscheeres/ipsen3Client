import { Component, OnInit } from '@angular/core';
import DataModel from '../models/DataModel';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vertical-navigation-bar',
  templateUrl: './vertical-navigation-bar.component.html',
  styleUrls: ['./vertical-navigation-bar.component.css']
})
export class VerticalNavigationBarComponent implements OnInit {
  show: boolean = DataModel.hiddenHamburger.show;
  mySubscription: Subscription
  constructor(private _router: Router) {
    var time = 500
    this.mySubscription = interval(time).subscribe((x => {
      this.doStuff();
    }));
  }

  ngOnInit() {
  }
  doStuff() {
    this.show = DataModel.hiddenHamburger.show
  }
}
