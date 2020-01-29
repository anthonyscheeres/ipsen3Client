import { Component, OnInit} from '@angular/core';
import DataModel from '../models/DataModel';
import {Router} from '@angular/router';
import {PopupService} from '../popup.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})

export class DashboardListComponent implements OnInit {
  experimentParent: any;

  constructor(private router: Router, private popup: PopupService) {
  }

  ngOnInit() {

  }

  setExperimentParent(experimentChild: any){
    this.experimentParent = experimentChild;
  }

}
