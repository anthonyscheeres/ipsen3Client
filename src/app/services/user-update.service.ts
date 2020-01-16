import {UserModel} from "../models/UserModel";
import {deleteUser, updateUserRole} from './user';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PopupService} from "../popup.service";
import {UserRole} from "../models/UserRole";

@Injectable({providedIn: 'root'})
export class UserUpdate{

  users: UserModel[] = [];
  changes: UserModel[] = [];
  changesAlert: string[] = [];

  constructor(private http: HttpClient, private popupService: PopupService) { }

  cleanChanges() {
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(user.user_id);
      if(originalUser.user_role == user.user_role) {
        this.changes.splice(index);
      }
    });
  }

  makeMessage() {
    this.cleanChanges();
    for(let user of this.changes) {
      let originalUser = this.getOriginalUser(user.user_id);
      this.changesAlert.push(user.username + " van " + this.toTextRole(originalUser.user_role) + " naar " + this.toTextRole(user.user_role) + ".");
    }
  }

  emptyChanges() {
    this.changesAlert = [];
    this.changes = [];
    location.reload();
  }

  getOriginalUser(id: number) {
    for(let user of this.users) {
      if(user.user_id == id) {
        return user;
      }
    }
  }

  async saveChanges() {
    for(let user of this.changes) {
        this.http.put<string>(updateUserRole(user.user_id, user.user_role), "")
          .subscribe( response => {
            this.handleResponse(response);
          });
      }
      this.emptyChanges();
  }

  addChange(user: UserModel) {
    this.changes.push(user);
  }

  async deleteUser(user: UserModel) {
    this.http.post<string>(
      await deleteUser(), user.username
    ).subscribe(r => {
      this.handleResponse(r);
    });
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

  handleResponse(response: string) {
    if(response === 'fail') {
      this.popupService.dangerPopup("Er ging iets mis, probeer het later opnieuw.");
    } else {
      this.popupService.infoPopup("Succesvol afgerond.");
    }

  }

}
