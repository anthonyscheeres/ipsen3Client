import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperiments} from "../services/experiment";
import {ExperimentModel} from "../models/ExperimentModel";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {
  dataFromServer: any;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.http.get<ExperimentModel[]>(
      getExperiments())
      .subscribe(
      responseData => {
        this.dataFromServer = responseData;
        console.log(responseData);
      }
    )
    }
}
