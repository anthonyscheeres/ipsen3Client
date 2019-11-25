
/**
*
* @author Anthony Scheeres
*
*/
export class ServerModel {
  static host: String = "localhost";
  static port: String = "8080";

  constructor() {

  }

  get host(): String {
    return ServerModel.host;
  }
  set host(value: String) {
    ServerModel.host = value;
  }

  get port(): String {
    return ServerModel.port;
  }
  set port(value: String) {
    ServerModel.port = value;
  }



}
