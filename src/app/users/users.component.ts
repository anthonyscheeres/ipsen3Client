import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getUsers} from '../services/user';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import {UserRole} from '../models/UserRole';
import {UpdateUsersComponent} from "../update-users/update-users.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserUpdate} from "../services/user-update.service";
import {AccountModel} from '../models/AccountModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
    let changedUser: UserModel = {...user};
    changedUser.user_role = event.target.value;
    this.updateService.addChange(changedUser);
  }

  onSaveChanges() {
    if(this.updateService.changes.length == 0) {
      alert("There are no changes to commit!");
      //TODO: use global popup
    } else {
      this.updateService.makeMessage();
      this.modalService.open(UpdateUsersComponent);
    }
  }

  onDelete(user: UserModel) {
    this.updateService.deleteUser(user).then( r => {
      alert("Gebruiker " + user.username + " is succesvol verwijderd.");
      console.log(r);
    });
    // location.reload();
  }

  async ngOnInit() {
    AccountModel.token = localStorage.getItem("token");

    this.http.get<UserModel[]>(
      getUsers())
      .subscribe(
        responseData => {
          this.updateService.users = responseData.slice();
          this.users = responseData.slice();
        }
      );
  }

}
