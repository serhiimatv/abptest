import { VinResultsEntity } from "./entities";

export interface VinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VinResultsEntity[];
}
