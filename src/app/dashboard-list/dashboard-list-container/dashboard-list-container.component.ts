import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ExperimentModel } from 'src/app/models/ExperimentModel';
import { getExperimentUrl } from 'src/app/experiment-list/ExperimentUrl';
import { getPhaseExperimentUrl } from 'src/app/experiment-list/ExperimentUrl';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {DashboardModel} from 'src/app/models/DashboardModel';
import { PopupService } from 'src/app/popup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExistingExperimentComponent } from 'src/app/experiment-list/existing-experiment/existing-experiment.component';

import DataModel from '../../models/DataModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-list-container',
  templateUrl: './dashboard-list-container.component.html',
  styleUrls: ['./dashboard-list-container.component.css'],
  providers: [PopupService]
})

export class DashboardListContainerComponent implements OnInit {
  serverExperiments: any;
  serverExperimentsOnUpload: any;

  @Input() experimentChild: any;
  @Output() notifyExperiment = new EventEmitter();
  @Input() phase: string;
  @Input() phaseCheck: string;

  constructor(private http: HttpClient, private popupService: PopupService, private modalService: NgbModal, private router: Router) {

  }

  ngOnInit() {
    if(DataModel.account.token == null) {
      this.popupService.dangerPopup("U bent nog niet ingelogd.");
      this.router.navigate(['/']);
    } else {
      this.fetchPost();
    }
  }

  dragAndSendExperimentToParent(ev: any, selectedExperiment: any){
    this.establishDragStartingPoint(ev);
    this.passExperiment(selectedExperiment);
  }

  draggingOverDropZone(ev: any) {
    this.preventOpenAsLink(ev);
    if (this.checkIfElementContainsBox(ev)){
      this.boxContainerAddsColor(ev);
    }
  }

  droppingDragElement(ev: any) {
    this.preventOpenAsLink(ev);
    let data = ev.dataTransfer.getData("dragged-id");
    if (this.checkIfElementContainsBox(ev)){
      this.appendsDragElement(ev, data);
    }
  }

  appendsDragElement(ev: any, data: any){
    ev.target.appendChild(document.getElementById(data));
    this.updatePost();
    this.boxContainerRemovesColor(ev);
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent, { windowClass : "myCustomModalClass"});
    modal.componentInstance.model = model;

  }

  updatePost(){
    this.postRequest(this.postBody());
  }

  fetchPost(){
    this.http
      .get<ExperimentModel>(getExperimentUrl())
      .subscribe(posts => {
        this.serverExperiments = posts;
      });
  }

  postRequest(dashboardModel: DashboardModel){
    this.http
      .post<DashboardModel>(getPhaseExperimentUrl(), dashboardModel,
      {
        headers: new HttpHeaders(
          { "Accept": "application/json",
            "Content-Type": "application/json"
          })
      }).subscribe(posts => { this.postData(posts); },
      (err: HttpErrorResponse) => {  this.postError(err); });
  }

  postBody(){
    let dashboardModel = new DashboardModel();
    this.setId(dashboardModel);
    this.setPhase(dashboardModel);

    return dashboardModel;
  }

  postData(posts: any){
    this.serverExperimentsOnUpload = posts;
    this.showPopUpSucces();
  }

  postError(err: HttpErrorResponse){
    this.serverExperimentsOnUpload = err.error;
    this.showPopUpFailed();
    setTimeout(()=> location.reload(), 2300);
  }

  showPopUpSucces(){
    this.popupService.succesPopup(
      this.experimentChild.experiment_name + ' Is Succesvol Van Fase Veranderd!'
    );
  }

  passExperiment(selectedExperiment: any){
    this.notifyExperiment.emit(selectedExperiment);
  }

  showPopUpFailed(){
    this.popupService.dangerPopup(
      'CONNECTION ERROR: ' + this.experimentChild.experiment_name + ' Is Niet Fase Veranderd! Probeer Opnieuw.'
    );
  }

  setId(dashboardModel: DashboardModel){
    dashboardModel.id = this.experimentChild.experiment_id;
  }

  setPhase(dashboardModel: DashboardModel){
    dashboardModel.phase = this.phaseCheck;
  }

  setColor(status: string){
    let colors = {
      Groen:"#A3B86C",
      Geel: "#EBC944",
      Rood: "#C02F1D"
    };

    for (let key in colors) {
      if(key === status){
        let value = colors[key];

        return value;
      }
    }
  }

  establishDragStartingPoint(ev: any) {
    ev.dataTransfer.setData("dragged-id", ev.target.id);
    ev.target.classList.add("transparant");
  }

  checkIfElementContainsBox(ev: any){
    let containBox = ev.target.classList.contains('box');

    return containBox;
  }

  boxContainerRemovesColor(ev: any){
    ev.target.classList.remove("add-boxcontainer");
  }

  removesOpacityFromDragElement(ev: any){
    ev.target.classList.remove("transparant");
  }

  boxContainerAddsColor(ev:any){
    ev.target.classList.add("add-boxcontainer");
  }

  preventOpenAsLink(ev: any){
    ev.preventDefault();
  }

}
