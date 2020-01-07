import { getHasWriteFromCookie, getHasDeleteFromCookie, getHasReadFromCookie, getHasAdminFromCookie } from '../services/cookie';


export class AccountModel {


  token: String = localStorage.getItem("token");
  hasWrite = getHasWriteFromCookie()
  hasDelete = getHasDeleteFromCookie()
  hasRead = getHasReadFromCookie()
  hasSuperPermission: boolean = getHasAdminFromCookie()
  constructor() { }

}
