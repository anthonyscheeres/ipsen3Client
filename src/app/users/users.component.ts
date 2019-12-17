import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {getUsers, register, updateUserRole} from '../services/user';
import { HttpClient } from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import { UserRole } from '../models/UserRole';
import {responseR} from "../models/ResponseRequest";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  changes: UserModel[] = [];
  changesAlert: String = '';
  private response: string;

  constructor(private _router: Router, private http: HttpClient) { }

  getRole(user: UserModel) {
    switch (user.user_role) {
      case UserRole.USER:
        return "USER";
      case UserRole.EMPLOYEE:
        return "EMPLOYEE";
      case UserRole.SUPERUSER:
        return "SUPERUSER";
    }
  }

  onRoleChanged(user: UserModel, event) {
    user.user_role = event.target.value;
    this.changes.push(user);
  }

  cleanChanges() {
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(index);
      if(originalUser.user_role == user.user_role) {
        this.changes.splice(index);
      }
    });
  }

  getOriginalUser(id: number) {
    for(let user of this.users) {
      if(user.user_id == id) {
        return user;
      }
    }
  }

  onDelete(user: UserModel) {
    console.log("Delete user ", user.username)
  }

  onSaveChanges() {
    this.cleanChanges();
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(index);
      this.changesAlert += "Change " + user.username + " from " + originalUser.user_role + " to " + user.user_role +  "\n";
    });
    alert(this.changesAlert);
  }

  async saveChanges() {
    for(let user of this.changes) {
      this.http.put<string>(updateUserRole(user.user_id, user.user_role), "")
        .subscribe( response =>
          this.response = response
        );
    }
    this.emptyChanges();
  }

  emptyChanges() {
    this.changesAlert = '';
    this.changes = [];
  }

  async ngOnInit() {
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
