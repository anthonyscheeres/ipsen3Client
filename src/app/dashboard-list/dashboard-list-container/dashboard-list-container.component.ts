import { Component, OnInit, Input, HostListener} from '@angular/core';
import { ExperimentModel } from 'src/app/models/ExperimentModel';
import { getExperimentUrl } from 'src/app/experiment-list/ExperimentUrl';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard-list-container',
  templateUrl: './dashboard-list-container.component.html',
  styleUrls: ['./dashboard-list-container.component.css'],
})

export class DashboardListContainerComponent implements OnInit {
  serverExperiments: any;
  sortDirection: String;

  @Input() fase: String;
  @Input() faseCheck: String;

  constructor(private http: HttpClient) {

  }

  @HostListener('click')
  sort(){
    this.directionAssignToHeader();
  }

  private directionAssignToHeader(){
    if(this.sortDirection === 'asc'){

      return this.sortDirection = 'desc';
    }
    else{
      return this.sortDirection = 'asc';
    }
  }

  private getColor(status: string){
    let colors = {
      Groen:"#A3B86C",
      Geel: "#EBC944",
      Rood: "#C02F1D"
    };

    for (let key in colors) {
      if(key === status){
        let values = colors[key];

        return values;
      }
    }
  }

  async ngOnInit() {
    this.fetchPosts();
  }

  onFetchPosts(){
    this.fetchPosts();
    this.getColor(status);
  }

  private fetchPosts(){
    this.http
      .get<ExperimentModel>(getExperimentUrl())
      .subscribe(posts => {
        this.serverExperiments = posts;
      });
  }
}
