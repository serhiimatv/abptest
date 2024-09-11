export interface VariablesResponse {
  Count: number;
  Message: string;
  SearchCriteria?: null;
  Results: ResultsEntity[];
}
export interface ResultsEntity {
  DataType: string;
  Description: string;
  GroupName?: string | null;
  ID: number;
  Name: string;
}
