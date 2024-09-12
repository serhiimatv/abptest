import { useQuery } from "@tanstack/react-query";
import { fetchVin, filteredData } from "../utility";
import { useCallback } from "react";

export const useVinQuery = (value: string) => {
  return useQuery({
    queryFn: () => fetchVin(value),
    queryKey: ["userVariable", value],
    enabled: false,
    select: useCallback(filteredData, [value]),
  });
};
