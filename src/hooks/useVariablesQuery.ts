import { useQuery } from "@tanstack/react-query";
import { VariablesResponse } from "../models/variablesResponse";

const fetchVariables = async () => {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useVariablesQuery = () => {
  return useQuery<VariablesResponse>({
    queryFn: fetchVariables,
    queryKey: ["variables"],
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
};
