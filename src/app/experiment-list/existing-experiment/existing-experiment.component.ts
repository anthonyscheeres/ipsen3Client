import { Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ExperimentModel} from '../../models/ExperimentModel';
import {ServerModel} from '../../models/ServerModel';
import {AccountModel} from '../../models/AccountModel';
import * as url from 'url';
import {HttpClient} from '@angular/common/http';
import {getExperimentUrl} from '../ExperimentUrl';
import {LogModel} from '../../models/LogModel';

@Component({
  selector: 'app-existing-experiment-component',
  templateUrl: './existing-experiment.component.html',
  styleUrls: ['./existing-experiment.component.css']
})
export class ExistingExperimentComponent implements OnInit {
  @Input() model: ExperimentModel;

  business_owner: string;
  experiment_description: string;
  experiment_id: number;
  experiment_leader: string;
  experiment_name: string;
  experiment_phase: string;
  experiment_status: string;
  inovation_cost: number;
  money_source: string;
  organisation: string;

  dataFromServer: LogModel[];

  newLogTitle: string = "Log titel";
  newLogDescription: string = "Log omschrijving";

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit() {
    this.business_owner = this.model.business_owner;
    this.experiment_description = this.model.experiment_description;
    this.experiment_id = this.model.experiment_id;
    this.experiment_leader = this.model.experiment_leader;
    this.experiment_name = this.model.experiment_name;
    this.experiment_phase = this.model.experiment_phase;
    this.experiment_status = this.model.experiment_status;
    this.inovation_cost = this.model.inovation_cost;
    this.money_source = this.model.money_source;
    this.organisation = this.model.organisation;

    this.fetchLogRows();
  }

  fetchLogRows(){
    let url = this.configureUrl();

    this.http.get<LogModel[]>(
      url).subscribe(responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }

  configureUrl(){
    let host = ServerModel.host;
    let port = ServerModel.port;
    let token = AccountModel.token;
    let url = "http://" + host + ":" + port + "/log/" + token +" /download/" + this.experiment_id;
    return url
  }

  uploadLog(title: string, description: string){
    let logModel = new LogModel();
  }
}
