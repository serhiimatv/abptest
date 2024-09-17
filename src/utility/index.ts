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
