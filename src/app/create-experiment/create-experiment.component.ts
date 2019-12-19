import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";
import {ExperimentModel} from "../models/ExperimentModel";
import {getCreateToken} from "../experiment-list/ExperimentToken";



@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  dataFromServer: any;
  name;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  async createExperiment(event) {
    event.preventDefault()
    const target = event.target

    const experiment_name = target.querySelector('#experiment_name').value
    const password = target.querySelector('#password').value
    const email = target.querySelector('#email').value
    this.http.put<ExperimentModel>(getCreateToken(), name)
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }
}
