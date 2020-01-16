import { getHasWriteFromCookie, getHasDeleteFromCookie, getHasReadFromCookie, getHasAdminFromCookie } from '../services/cookie';

/**
*
* @author Anthony Scheeres
*
*/
export class AccountModel {


  token: String = null;
  hasWrite = false
  hasDelete = false
  hasRead = false
  hasSuperPermission: boolean = false
  constructor() { }

}
