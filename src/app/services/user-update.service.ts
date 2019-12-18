import {UserModel} from "../models/UserModel";
import {updateUserRole} from "./user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class UserUpdate{
  private response: string;

  constructor(private http: HttpClient) {
  }

  users: UserModel[];
  changes: UserModel[] = [];
  changesAlert: string = '';

  cleanChanges() {
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(index);
      if(originalUser.user_role == user.user_role) {
        this.changes.splice(index);
      }
    });
  }

  makeMessage() {
    this.cleanChanges();
    this.changes.forEach((user, index) => {
      let originalUser = this.getOriginalUser(index);
      this.changesAlert += "Change " + user.username + " from " + originalUser.user_role + " to " + user.user_role +  "\n";
    });
  }

  emptyChanges() {
    this.changesAlert = '';
    this.changes = [];
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
          .subscribe( response =>
            this.response = response
          );
      }
      this.emptyChanges();
  }

}
