import { AccountModel } from './AccountModel';
import { hiddenElement } from './hiddenElements';


/**
*
* @author Anthony Scheeres
*
*/
export default class DataModel {
  static account: AccountModel = new AccountModel();
  static hiddenHamburger = new hiddenElement();
}
