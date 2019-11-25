import { Component, OnInit } from '@angular/core';
import { sendHttpRequest } from '../services/http.component';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  static users: Array<string>;



 

  constructor() {

    var host = ServerModel.host
    var port = ServerModel.port
    var url = "http://" + host + ":" + port + "/user/login";

    var data =null



    sendHttpRequest(url, data.toString()).then(response => {
      console.log("response : " + response);
   
      UsersComponent.users = JSON.parse(response)

      

    });

  }

  get users(): Array<string> {
    return UsersComponent.users;
  }
  set host(value) {
    UsersComponent.users = value;
  }

 

  ngOnInit() {
  }


}
