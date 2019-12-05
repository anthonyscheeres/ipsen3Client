import { ServerModel } from '../models/ServerModel';
import { responseR } from '../models/ResponseRequest';
import { AccountModel } from '../models/AccountModel';
import { fetchJsonPost, fetchJsonGet } from './http.';

export function getExperiments() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var url = "http://" + host + ":" + port + "/experiment/showAllExperiments";

  return url
}
