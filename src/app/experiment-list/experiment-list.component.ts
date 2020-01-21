import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getExperimentUrl} from "./ExperimentUrl";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "../create-experiment/create-experiment.component";
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import { deleteExperiment } from "../services/experiment";
import {PopupService} from "../popup.service";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css'],
  providers: [PopupService]
})

export class ExperimentListComponent implements OnInit {
  dataFromServer: ExperimentModel[] = [];
  experiments: ExperimentModel[] = [];

  constructor(private http: HttpClient, private popupService: PopupService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.showExperiments();
  }

  showExperiments() {
    this.http.get<ExperimentModel[]>(
      getExperimentUrl())
      .subscribe(
        responseData => {
          this.experiments = this.dataFromServer = responseData;
        }
      )
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
          }
        });
      }
    )
  }

  filterExperiments(searchValue: string) {
    // multiple value
    if (searchValue === ""){
      this.experiments = this.dataFromServer;
      return;
    }
    let filteredData: ExperimentModel[] = [];

    for (let experiment of this.dataFromServer) {
      for (let experimentValue of Object.values(experiment)) {
        if (experimentValue.toString().toLowerCase().includes(searchValue.toLowerCase())) {
          filteredData.push(experiment);
          break;
        }
      }
    }

    if (filteredData.length == 0) {
      this.popupService.infoPopup(
        "Helaas waar up opzocht " + searchValue + " konden wij niet vinden."
      );
    } else {
      this.experiments = filteredData;
    }
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(
      ExistingExperimentComponent,
      { windowClass : "myCustomModalClass"}
    );
    modal.componentInstance.model = model;
  }

  open() {
    this.modalService.open(CreateExperimentComponent);
  }
}
