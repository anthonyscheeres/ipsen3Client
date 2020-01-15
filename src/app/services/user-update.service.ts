import {UserModel} from "../models/UserModel";
import {deleteUser, updateUserRole} from './user';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserUpdate{

  users: UserModel[] = [];
  changes: UserModel[] = [];
  changesAlert: string[] = [];
  private response: string;

  constructor(private http: HttpClient) { }

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
      this.changesAlert.push(user.username + " van " + originalUser.user_role + " naar " + user.user_role);
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
          .subscribe( response =>
            this.response = response
          );
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
    }, error =>{
      console.log(error);
    });
  }

}
