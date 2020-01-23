import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getUsers} from '../services/user';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/UserModel";
import {UserRole} from '../models/UserRole';
import {UpdateUsersComponent} from "../update-users/update-users.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserUpdate} from "../services/user-update.service";
import {PopupService} from "../popup.service";
import {error} from "util";
import {UserPermissionService} from "../services/user-permission-service";

/**
 * @author Valerie Timmerman
 * This class is used to control the list with all the users in it.
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  canEdit;

  constructor(
    private _router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private updateService: UserUpdate,
    private popupService: PopupService,
    private permissions: UserPermissionService
  ) { }

  /**
   * @author Valerie Timmerman
   * Gets the role of a user to send to the select box which field should be selected.
   * @param user
   */
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

  /**
   * @author Valerie Timmerman
   * @param user
   * @param event
   * Adds a user with its role changed to the list of changes in the service.
   */
  onRoleChanged(user: UserModel, event) {
    let changedUser: UserModel = {...user};
    changedUser.user_role = event.target.value;
    this.updateService.addChange(changedUser);
  }

  /**
   * @author Valerie Timmerman
   * Sends data to the update service and opens confirmation pop-up.
   */
  onSaveChanges() {
    if(this.updateService.changes.length == 0) {
      this.popupService.dangerPopup("There are no changes to commit!");
      //TODO: use global popup
    } else {
      this.updateService.makeMessage();
      this.modalService.open(UpdateUsersComponent);
    }
  }

  /**
   * @author Valerie Timmerman
   * @param user
   */
  onDelete(user: UserModel) {
    this.popupService.showConfirmPopup("Weet u zeker dat u gebruiker " + user.username + " wilt verwijderen?").then(
      () => {
        this.updateService.deleteUser(user);
        this.showUsers();
      });
  }

  showUsers(){
    this.http.get<UserModel[]>(
      getUsers())
      .subscribe(
        responseData => {
          this.updateService.users = responseData.slice();
          this.users = responseData.slice();
        }
      );
  }

  async ngOnInit() {
    this.showUsers();
    var self = this;
    this.permissions.initialize(function() {
      self.canEdit = self.permissions.hasSuperPermissions();
    });
  }

}
