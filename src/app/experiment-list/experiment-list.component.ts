import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperiments} from "../services/experiment";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "../create-experiment/create-experiment.component";
import { AccountModel } from '../models/AccountModel';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {
  dataFromServer: any;

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  async ngOnInit() {
    AccountModel.token = localStorage.getItem("token")
    this.http.get<ExperimentModel[]>(
      getExperiments())
      .subscribe(
      responseData => {
        this.dataFromServer = responseData;
        console.log(responseData);
      }
    )
    }
  open() {
    const modalRef = this.modalService.open(CreateExperimentComponent);
    modalRef.componentInstance.name = 'World'
  }
}
