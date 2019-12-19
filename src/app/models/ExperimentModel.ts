export class ExperimentModel {
  business_owner: string;
  experiment_description: string;
  experiment_id: number;
  experiment_leader: string;
  experiment_name: string;
  experiment_phase: string;
  experiment_status: string;
  inovation_cost: number;
  money_source: string;
  organisation: string;

  constructor(business_owner: string, experiment_description: string,
              experiment_id: number, experiment_leader: string,
              experiment_name: string, experiment_phase: string,
              experiment_status: string, inovation_cost: number,
              money_source: string, organisation: string) {
    this.business_owner = business_owner;
    this.experiment_description = experiment_description;
    this.experiment_id = experiment_id;
    this.experiment_leader = experiment_leader;
    this.experiment_name = experiment_name;
    this.experiment_phase = experiment_phase;
    this.experiment_status = experiment_status;
    this.inovation_cost = inovation_cost;
    this.money_source = money_source;
    this.organisation = organisation;
  }
}
