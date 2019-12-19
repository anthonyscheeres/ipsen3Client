import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";
import {ExperimentModel} from "../models/ExperimentModel";
import {getCreateExperimentUrl} from "../experiment-list/ExperimentUrl";


@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  dataFromServer: any;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  async createExperiment(event) {
    event.preventDefault()
    const target = event.target
    let experimentModel = new ExperimentModel;
    experimentModel.business_owner


    experimentModel.experiment_name = target.querySelector('#experiment_name').value;
    experimentModel.experiment_description = target.querySelector('#experiment_description').value;
    experimentModel.experiment_leader = target.querySelector('#experiment_leader').value;
    experimentModel.experiment_phase = target.querySelector('#experiment_phase').value;
    experimentModel.experiment_status = target.querySelector('#experiment_status').value;
    experimentModel.inovation_cost = target.querySelector('#inovation_cost').value;
    experimentModel.money_source = target.querySelector('#money_source').value;
    experimentModel.organisation = target.querySelector('#organisation').value;

    this.http.put<ExperimentModel>(getCreateExperimentUrl(), experimentModel)
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }
}
