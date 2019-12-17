import { Component, OnInit } from '@angular/core';
import { ExperimentModel } from '../models/ExperimentModel';
import { HttpClient } from '@angular/common/http';
import { getExperiments } from '../services/experiment';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  serverExperiments: any;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.fetchPosts();
  }

  onFetchPosts(){
    this.fetchPosts();

  }

  private fetchPosts(){
    this.http
      .get<ExperimentModel>(getExperiments())
      .subscribe(posts => {
        this.serverExperiments = posts;
        console.log(posts);
      })
  }

}


