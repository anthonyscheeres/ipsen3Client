import { Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ExperimentModel} from '../../models/ExperimentModel';
import {ServerModel} from '../../models/ServerModel';
import {AccountModel} from '../../models/AccountModel';
import * as url from 'url';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getExperimentUrl} from '../ExperimentUrl';
import {LogModel} from '../../models/LogModel';
import {log} from 'util';
import DataModel from "../../models/DataModel";

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
  dataFromServerOnUpload: any;

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
    let url = this.configureDowloadUrl();

    this.http.get<LogModel[]>(
      url).subscribe(responseData => {
        console.log(responseData
        );
          this.dataFromServer = responseData;
        }
      )
  }

  configureDowloadUrl(){
    let host = ServerModel.host;
    let port = ServerModel.port;
    let token = DataModel.account.token;
    let url = "http://" + host + ":" + port + "/log/" + token +" /download/" + this.experiment_id;
    return url
  }

  configureUploadUrl(){
    let host = ServerModel.host;
    let port = ServerModel.port;
    let token = DataModel.account.token;

    let url = "http://" + host + ":" + port + "/log/" + token +"/upload/";
    return url;
  }

  uploadLog(){
    let logModel = new LogModel();

    logModel.title = this.newLogTitle;
    logModel.description = this.newLogDescription;
    logModel.experiment_id = this.experiment_id;

    this.http.post(this.configureUploadUrl(), logModel,
      {
        headers: new HttpHeaders({
          "Accept": "application/json",
          "Content-Type": "application/json"})

      }).subscribe(responsData => {
        this.dataFromServerOnUpload = responsData;
        this.fetchLogRows();
    });


  }
}
