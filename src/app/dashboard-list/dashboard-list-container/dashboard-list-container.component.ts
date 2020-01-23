import { Component, OnInit, Input} from '@angular/core';
import { ExperimentModel } from 'src/app/models/ExperimentModel';
import { getExperimentUrl, getPhaseExperimentUrl } from 'src/app/experiment-list/ExperimentUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-dashboard-list-container',
  templateUrl: './dashboard-list-container.component.html',
  styleUrls: ['./dashboard-list-container.component.css'],
})

export class DashboardListContainerComponent implements OnInit {
  serverExperiments: any;
  phase: String;
  id: String;

  @Input() fase: String;
  @Input() faseCheck: String;

  constructor(private http: HttpClient) {

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

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts(){
    this.http
      .get<ExperimentModel>(getExperimentUrl())
      .subscribe(posts => {
        this.serverExperiments = posts;
     
      });
  }

  updateTest(phaseOfBox: String){


    var phaseOfContainer = this.phase;
    console.log(phaseOfContainer);
    var idContainer = this.id;
    console.log(idContainer);
    var data = [phaseOfBox, idContainer];
    if(phaseOfContainer != phaseOfBox){
      this.http
      .post<string>(getPhaseExperimentUrl(), data, {

        headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'})
      }).subscribe(posts => {
        this.serverExperiments = posts;
      });
    }
  }

  getExperimentPhase(experimentPhase: String){
    return this.phase = experimentPhase;
  }

  getIdPhase(idValue: String){
    return this.id = idValue;
  }

  droppingDragElement(ev: any) {
    ev.preventDefault();
    var droppable = ev.target.classList.contains('box');
    var data = ev.dataTransfer.getData("dragged-id");
    if(droppable){
      ev.target.appendChild(document.getElementById(data));
    }
  }

  draggingOverDropZone(ev: any) {
    ev.preventDefault();
  }

  establishDragStartingPoint(ev: any) {
    ev.dataTransfer.setData("dragged-id", ev.target.id);
  }

  dragMessageWhileDragged(ev: any){
    document.getElementById("demo").innerHTML = "The p element is being dragged";
  }

  dropMessage(){
    document.getElementById("demo").innerHTML = "The p element was dropped"
  }

  dropAndShowMessage(ev: any){
    this.droppingDragElement(ev);
    this.dropMessage();
  }

}
