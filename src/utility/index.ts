import { QueryClient } from "@tanstack/react-query";
import { VinResponse } from "../models/vinResponse";

export const stripHtmlTags = (str: string): string => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

export const fetchVariables = async () => {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const fetchVin = async (vin: string) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
  );

  if (!response.ok) {
    const responseError = await response.json();

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

export const validateSize = (string: string): boolean => {
  if (string.length === 17) {
    return false;
  }
  return true;
};

export const validateProhibitedSymbols = (string: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return !regex.test(string);
};

export const checkCodesArrayLength = (array: string[], string: string) => {
  const arrayClone = [...array];
  if (arrayClone.length === 3) {
    arrayClone.shift();
    arrayClone.push(string);
  } else {
    arrayClone.push(string);
  }

  return arrayClone;
};

export const getDecryptedCodesFromHistory = (
  client: QueryClient,
  cache: string[]
): string[] => {
  const queries = client
    .getQueryCache()
    .findAll({ queryKey: ["userVariable"] });

  const keys = queries.map((query) => {
    if (cache.includes(query.queryKey[1] as string)) {
      return query.queryKey[1];
    }
  }) as string[];

  return keys.filter((key) => key);
};
