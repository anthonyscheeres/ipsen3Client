import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperimentUrl} from "./ExperimentUrl";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "../create-experiment/create-experiment.component";
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import { AccountModel } from '../models/AccountModel';


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
    AccountModel.token = localStorage.getItem("token")
    this.http.get<ExperimentModel[]>(
      getExperimentUrl())
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent);
    modal.componentInstance.model = model;

  }

  open() {
    this.modalService.open(CreateExperimentComponent);
  }
};
