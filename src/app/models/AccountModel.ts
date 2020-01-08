import { getHasWriteFromCookie, getHasDeleteFromCookie, getHasReadFromCookie, getHasAdminFromCookie } from '../services/cookie';

/**
*
* @author Anthony Scheeres
*
*/
export class AccountModel {


  token: String = localStorage.getItem("token");
  hasWrite 
  hasDelete 
  hasRead 
  hasSuperPermission: boolean 
  constructor() { }

}
