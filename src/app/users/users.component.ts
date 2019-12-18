import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {getUsers, updateUserRole} from '../services/user';
import { HttpClient } from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import { UserRole } from '../models/UserRole';
import {UpdateUsersComponent} from "../update-users/update-users.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserUpdate} from "../services/user-update.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserUpdate]
})
export class UsersComponent implements OnInit {
  response: string;
  users: UserModel[];

  constructor(
    private _router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private updateService: UserUpdate
  ) { }

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
    user.user_role = event.target.value;;
    this.updateService.changes.push(user);
  }

  onSaveChanges() {
    this.updateService.makeMessage();
    this.modalService.open(UpdateUsersComponent);
  }

  onDelete(user: UserModel) {
    console.log("Delete user ", user.username)
  }

  async ngOnInit() {
    this.http.get<UserModel[]>(
      getUsers())
      .subscribe(
        responseData => {
          this.updateService.users = responseData.slice();
          this.users = responseData.slice();
          console.log(responseData);
        }
      );
  }

}
