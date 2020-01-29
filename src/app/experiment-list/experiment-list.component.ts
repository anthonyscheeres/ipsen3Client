import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperimentUrl} from "./ExperimentUrl";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "./create-experiment/create-experiment.component";
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import { deleteExperiment, getExperiments } from "../services/experiment";
import {PopupService} from "../popup.service";
import DataModel from '../models/DataModel';
import {Router} from '@angular/router';
import { FilterService } from "../filter.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css'],
  providers: [
    PopupService,
    FilterService,
  ]
})

export class ExperimentListComponent implements OnInit {
  constructor(private http: HttpClient, private popupService: PopupService, private modalService: NgbModal, private filterService: FilterService) { }

  showExperiments() {
    this.http.get<ExperimentModel[]>(
      getExperimentUrl())
      .subscribe(
        responseData => {
          this.filterService.isDataSet.next(responseData)
        }
      )
  }

  async ngOnInit() {
    this.showExperiments();
  }


  deleteExperiment(experiment : ExperimentModel) {
    this.popupService.showConfirmPopup(experiment.experiment_name).then(
      () => {
        this.http.delete(
          deleteExperiment(experiment.experiment_id),
          { responseType: "text" }
        ).subscribe(responseData => {
          if (responseData.toLowerCase() == "succes") {
            this.showExperiments();
            this.popupService.succesPopup(
              experiment.experiment_name + ' is succesvol verwijderd!'
            );
          } else { this.popupService.dangerPopup(responseData); }
        });
      }
    )
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent);
    modal.componentInstance.model = model;
  }

  openCreateExperiment() {
    this.modalService.open(CreateExperimentComponent, { windowClass : "myCustomModalClass"});
  }

};
