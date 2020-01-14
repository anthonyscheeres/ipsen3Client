import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperimentModel } from "../models/ExperimentModel";
import { deleteExperiment, getExperiments } from "../services/experiment";
import {PopupService} from "../popup.service";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css'],
  providers: [PopupService]
})

export class ExperimentListComponent implements OnInit {
  dataFromServer: any;

  constructor(private http: HttpClient, private popupService: PopupService) { }

  showExperiments() {
    this.http.get<ExperimentModel[]>(
      getExperiments())
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
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
}
