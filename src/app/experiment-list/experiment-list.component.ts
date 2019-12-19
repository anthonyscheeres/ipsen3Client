import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperimentToken} from "./ExperimentToken";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "../create-experiment/create-experiment.component";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {
  dataFromServer: any;

  constructor(private http: HttpClient, private modalService: NgbModal) {
  }

  async ngOnInit() {
    // console.log("he de token bestaat nog: "+AccountModel.token)
    this.http.get<ExperimentModel[]>(
      getExperimentToken())
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }

  open() {
    this.modalService.open(CreateExperimentComponent);
  }
};
