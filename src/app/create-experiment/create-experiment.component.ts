import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getCreateExperimentUrl} from "../experiment-list/ExperimentUrl";
import {NgForm} from "@angular/forms";


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
  fasens: string;
  statussen: string;
  experimentleaders: string;
  organisations: string;
  businessOwners: string;
  inovation_cost: number;
  money_source: string;
  private modalReference: any;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    let data = form.value;

    this.http.post(getCreateExperimentUrl(), data,
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
    this.modalReference.close();

  }
}
