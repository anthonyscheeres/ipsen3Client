import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperimentModel } from "../models/ExperimentModel";
import { deleteExperiment } from "../services/experiment";
import { PopupService } from "../popup.service";
import { ExistingExperimentComponent } from './existing-experiment/existing-experiment.component';
import { CreateExperimentComponent } from '../create-experiment/create-experiment.component';
import { getExperimentUrl } from './ExperimentUrl';
import { FilterService } from "../filter.service";

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
  modalService: any;

  constructor(private http: HttpClient, private popupService: PopupService, private filterService: FilterService) { }

  showExperiments() {
    this.http.get<ExperimentModel[]>(
      getExperimentUrl())
      .subscribe(
        responseData => {
          this.filterService.isDataAvailable.next(responseData)
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
          }
        });
      }
    )
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent);
    modal.componentInstance.model = model;
  }

  open() {this.modalService.open(CreateExperimentComponent);}
}
