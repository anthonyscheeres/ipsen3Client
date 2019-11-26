import { Component, OnInit } from '@angular/core';
import { sendHttpGetRequest } from '../services/http.component';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  static itemsDetails
    static currentSelected: Number = null;


 

  constructor() {

    var host = ServerModel.host
    var port = ServerModel.port
    var url = "http://" + host + ":" + port + "/user/show";

  




    sendHttpGetRequest(url).then(response => {
      console.log("response : " + response);
      UsersComponent.itemsDetails = JSON.parse(response)
 
    });

  }

  clickedItemIndex(i) {
    UsersComponent.currentSelected = i 
  }

  

 

  ngOnInit() {
  }


}
