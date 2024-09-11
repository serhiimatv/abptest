import { useQuery } from "@tanstack/react-query";
import { fetchVariables } from "../utility";
import { VariablesResponse } from "../models/variablesResponse";

export const useVariablesQuery = () => {
  return useQuery<VariablesResponse>({
    queryFn: fetchVariables,
    queryKey: ["variables"],
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
};
