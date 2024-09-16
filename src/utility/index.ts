import { QueryClient } from "@tanstack/react-query";

export const stripHtmlTags = (str: string): string => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

export const validateMaxSize = (string: string, size: number): boolean => {
  if (string.length <= size) {
    return false;
  }
  return true;
};

export const validateProhibitedSymbols = (string: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return !regex.test(string);
};

export const checkCodesArrayLength = (
  array: string[],
  string: string,
  length: number
): string[] => {
  const arrayClone = [...array];
  if (arrayClone.length === length) {
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
