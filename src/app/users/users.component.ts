import { Component, OnInit } from '@angular/core';
import { sendHttpGetRequest } from '../services/http.component';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataFromServer: any = loadUsers();
    static currentSelected: Number = null;
  customHeaders: any = {
    thead: ['CUSTOM NAME 1', 'SOME COOL NAME', 'ANOTHER NAME'], // the Column Name in table head.
    displayed: ['someFeild1', 'someFeild2', 'someFeild3'] // the data it should populate in table.
  };

 

  constructor(private _router: Router) { }

  deleteByIdS(ids) {
    console.log(ids); // this function gives the ID of deleted rows.. as an array
  }

  updateChanges(row) {
    console.log(row); // This return the row which is updated with the id.
  }


 

  ngOnInit() {
    loadUsers()
  }


}

function loadUsers() {
  var host = ServerModel.host
  var port = ServerModel.port
  var url = "http://" + host + ":" + port + "/user/show";






  sendHttpGetRequest(url).then(response => {
    console.log("response : " + response);
    return response;

  });
} 
