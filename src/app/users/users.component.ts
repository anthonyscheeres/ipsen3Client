import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ServerModel } from '../models/ServerModel';
import { Router } from '@angular/router';
import {getUsers, loadUsers} from '../services/user';
import { HttpClient } from "@angular/common/http";
import {UserModel} from "../models/UserModel";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataFromServer: any;
  static currentSelected: any = null;
  private selectedUser: UserModel = null;

  constructor(private _router: Router, private http: HttpClient) { }

  setSelected(user: UserModel) {
    if (this.selectedUser == null) {
      this.selectedUser = user;
    } else if (this.selectedUser == user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  }

  getRole(user: UserModel) {
    if(user.has_delete && user.has_write && user.has_delete) {
      return "super";
    } else if(user.has_write && user.has_read) {
      return "admin";
    } else {
      return "user";
    }
  }

  onSave() {
    console.log("save pressed");
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
      );
  }

}
