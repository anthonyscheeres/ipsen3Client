import { ServerModel } from '../models/ServerModel';
import { AccountModel } from '../models/AccountModel';

export function getExperiments() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;

  // var url = "http://" + host + ":" + port + "/experiment/showAllExperiments";
  return "http://" + host + ":" + port + "/experiment/" +token+"/showAllExperiments";
}

export function deleteExperiment(experiment_id : number) {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = AccountModel.token;

  return "http://" + host + ":" + port + "/experiment/" + token + "/remove/" + experiment_id;
}
