export interface VariablesResultsEntity {
  DataType: string;
  Description: string;
  GroupName?: string | null;
  ID: number;
  Name: string;
}

export interface VinResultsEntity {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}
