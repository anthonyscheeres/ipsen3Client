import {UserModel} from "../models/UserModel";
import {deleteUser, updateUserRole} from './user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PopupService} from "../popup.service";
import {UserRole} from "../models/UserRole";
import {UserPermissionService} from "./user-permission-service";
import {ResponseModel} from "../models/ResponseModel";

@Injectable({providedIn: 'root'})
export class UserUpdate {

  users: UserModel[] = [];
  changes: UserModel[] = [];
  changesAlert: string[] = [];


  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private permissions: UserPermissionService
  ) {
    this.permissions.initialize();
  }

  cleanChanges() {
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(user.user_id);
      if (originalUser.user_role == user.user_role) {
        this.changes.splice(index);
      }
    });
  }

  /**
   * @author Valerie Timmerman
   * This method makes a message for the user when he/she wants to save the changes, with in it all the changes
   * that will be performed.
   */
  makeMessage() {
    this.cleanChanges();
    for (let user of this.changes) {
      let originalUser = this.getOriginalUser(user.user_id);
      this.changesAlert.push(user.username + " van " + this.toTextRole(originalUser.user_role) + " naar " + this.toTextRole(user.user_role) + ".");
    }
  }

  /**
   * @author Valerie Timmerman
   * This cleans the list of changes.
   */
  emptyChanges() {
    this.changesAlert = [];
    this.changes = [];
  }

  /**
   * @author Valerie Timmerman
   * @param id
   * This method gets the original values of the user that has been put in the list to change, for comparison.
   */
  getOriginalUser(id: number) {
    for (let user of this.users) {
      if (user.user_id == id) {
        return user;
      }
    }
  }

  /**
   * @author Valerie Timmerman
   * This method makes it possible to save the changes that were made to the users into the database after checking
   * the current users permissions.
   */
  async saveChanges() {
    if (this.permissions.hasSuperPermissions()) {
      for (let user of this.changes) {
        this.http.put<ResponseModel>(await updateUserRole(user.user_id, user.user_role), null)
          .subscribe(r => {
            this.handleResponse(r.response);
            this.emptyChanges();
          });
      }
    } else {
      this.popupService.dangerPopup("U heeft niet de juiste permissies voor deze bewerking.");
      this.emptyChanges();
    }

  }

  /**
   * @author Valerie Timmerman
   * @param user
   * Pushes a changed UserModel onto the changes list, to execute later after the user is done editing.
   */
  addChange(user: UserModel) {
    this.changes.push(user);
  }

  /**
   * @author Valerie Timmerman
   * @param user
   * This method is responsible for deleting users after the permissions are checked and deletion is confirmed
   * by the user.
   */
  async deleteUser(user: UserModel) {
    if (this.permissions.hasSuperPermissions()) {
      this.http.post<string>(
        await deleteUser(), user.username
      ).subscribe(r => {
        this.handleResponse(r);
      });
    } else {
      this.popupService.dangerPopup("U heeft niet de juiste permissies voor deze bewerking.");
    }
  }

  toTextRole(role: UserRole) {
    switch (role) {
      case UserRole.USER:
        return "gebruiker";
      case UserRole.EMPLOYEE:
        return "werknemer";
      case UserRole.SUPERUSER:
        return "superuser";
    }
  }

  handleResponse(response: any) {
    if (response === 'fail') {
      this.popupService.dangerPopup("Er ging iets mis, probeer het later opnieuw.");
    } else {
      this.popupService.infoPopup("Succesvol afgerond.");
    }

  }
}
