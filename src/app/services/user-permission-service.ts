import {Injectable} from "@angular/core";
import DataModel from "../models/DataModel";
import {HttpClient} from "@angular/common/http";
import {ServerModel} from "../models/ServerModel";
import {UserRole} from "../models/UserRole";

/**
 * @author Valerie Timmerman
 * This class is used to check if a user has permissions for certain actions.
 */

@Injectable({providedIn: "root"})
export class UserPermissionService {

  role: UserRole;

  constructor(private http: HttpClient) {
  }

  hasSuperPermissions() {
    if(this.role == UserRole.SUPERUSER) {
      return true;
    } else {
      return false;
    }
  }

  hasEmployeePermissions() {
    if(this.role == UserRole.EMPLOYEE) {
      return true;
    } else {
      return false;
    }
  }

  hasUserPermissions() {
    if(this.role == UserRole.USER) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @author Valerie Timmerman
   * Initializes the class by getting the role of the person that is using the application.
   */
  initialize(callBack?: Function) {
    var token = DataModel.account.token;
    var host = ServerModel.host;
    var port = ServerModel.port;
    var url = "http://" + host + ":" + port + "/user/"  + token + "/getRole";
    this.http.get(url, {responseType: "text"}).subscribe(r => {
      this.role = UserRole[r];
      if(callBack)
        callBack();
      }
    );
  }

}
