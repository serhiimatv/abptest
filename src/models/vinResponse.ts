export interface VinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VinResultsEntity[];
}
export interface VinResultsEntity {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}
export interface Error {
  message: string;
  messageDetail: string;
}
