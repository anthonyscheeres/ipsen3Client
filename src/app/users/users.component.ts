import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {getUsers} from '../services/user';
import { HttpClient } from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import { AccountModel } from '../models/AccountModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  changes: UserModel[] = [];

  constructor(private _router: Router, private http: HttpClient) { }

  getRole(user: UserModel) {
    if(user.has_delete && user.has_write && user.has_delete) {
      return "super";
    } else if(user.has_write && user.has_read) {
      return "admin";
    } else {
      return "user";
    }
  }

  onRoleChanged(user: UserModel, event) {
    let role = event.target.value;
    this.changes[user.user_id] = role;
  }

  onSave() {
    console.log("save pressed");
  }

  async ngOnInit() {
    AccountModel.token = localStorage.getItem("token")

    this.http.get<UserModel[]>(
      getUsers())
      .subscribe(
        responseData => {
          this.users = responseData;
          console.log(responseData);
        }
      );
  }

}
