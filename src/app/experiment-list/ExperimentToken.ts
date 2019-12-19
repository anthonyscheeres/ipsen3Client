import { ServerModel } from '../models/ServerModel';
import { AccountModel } from '../models/AccountModel';

var host = ServerModel.host;
var port = ServerModel.port;
var token = AccountModel.token;

export function getExperimentToken() {
  var url = "http://" + host + ":" + port + "/experiment/" +token+"/showAllExperiments";
  return url
}

export function getCreateToken() {
  var url = "http://" + host + ":" + port + "/experiment/" +token+" /createProject";
  return url
}
