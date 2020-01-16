import { ServerModel } from '../models/ServerModel';
import DataModel from '../models/DataModel';


export function getExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/" +token+"/showAllExperiments";
  return url
}

export function getCreateExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/" +token+" /createProject";
  return url
}
