import {Component, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getCreateExperimentUrl, getExperimentUrl} from "../experiment-list/ExperimentUrl";
import {NgForm} from "@angular/forms";
import {ExperimentModel} from "../models/ExperimentModel";
import {ProtocolR} from "../models/Protocol";


@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  dataFromServer: any;
  id: number;
  name: string;
  description: string;
  fasen: string;
  img: any;
  status: string;
  experimentleaders: string;
  experimentTeam: string;
  organisation: string;
  businessOwners: string;
  inovation_cost: number;
  money_source: string;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    var data = JSON.stringify(form.value);
    console.log(data);

    this.http.post<String>(getCreateExperimentUrl(), data,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'})
      }).subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )


/*    this.http.put<ExperimentModel>(getCreateExperimentUrl(), experimentModel)
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      ) */
  }
}
