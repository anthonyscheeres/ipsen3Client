import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';
import { Router } from '@angular/router';
import {getUsers, loadUsers} from '../services/user';
import { HttpClient } from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import {ExperimentModel} from "../models/ExperimentModel";
import {getExperiments} from "../services/experiment";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataFromServer: any = loadUsers();
  static currentSelected: Number = null;

  constructor(private _router: Router, private http: HttpClient) { }

  onDeleteUser() {

  }

  onGiveRead() {

  }

  onGiveWrite() {

  }

  onGiveDelete() {

  }

  async ngOnInit() {

    // this.http.get<UserModel[]>(loadUsers())
    //   .subscribe(
    //     responseData => {
    //       this.dataFromServer = responseData;
    //       console.log(responseData);
    //     }
    //   )

    this.http.get<UserModel[]>(
      getUsers())
      .subscribe(
        responseData => {
          this.dataFromServer = responseData;
          console.log(responseData);
        }
      )
  }

}
