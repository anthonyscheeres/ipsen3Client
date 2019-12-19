import { ServerModel } from '../models/ServerModel';
import { AccountModel } from '../models/AccountModel';


export function getExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;
  var url = "http://" + host + ":" + port + "/experiment/" +token+"/showAllExperiments";
  return url
}

export function getCreateExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;
  var url = "http://" + host + ":" + port + "/experiment/" +token+" /createProject";
  return url
}
