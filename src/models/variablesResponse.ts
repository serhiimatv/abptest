import { VariablesResultsEntity } from "./entities";

export interface VariablesResponse {
  Count: number;
  Message: string;
  SearchCriteria?: null;
  Results: VariablesResultsEntity[];
}
