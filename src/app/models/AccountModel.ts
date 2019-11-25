export class AccountModel {


  static token: String;

  constructor() { }



  get token(): String {
    return AccountModel.token;
  }
  set token(value: String) {
    AccountModel.token = value;
  }
}
