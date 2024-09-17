import { type ResponseError } from "@/models/responseError";
import { VinResponse } from "@/models/vinResponse";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const fetchVin = async (vin: string) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
  );

  if (!response.ok) {
    const responseError: ResponseError = await response.json();

    throw new Error(responseError.message);
  }

  const data = await response.json();
  return data;
};

export const filteredData = (response: VinResponse) => {
  if (response.Results) {
    return response.Results.filter((result) => {
      if (result.Value !== null && result.Value !== "") {
        return true;
      }
    });
  }
};

export const useVinQuery = (vin: string) => {
  return useQuery({
    queryFn: () => fetchVin(vin),
    queryKey: ["userVariable", vin],
    enabled: false,
    select: useCallback(filteredData, [vin]),
  });
};
