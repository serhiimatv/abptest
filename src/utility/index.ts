export const validateMaxSize = (input: string, size: number): boolean => {
  return input.length > size;
};

export const validateProhibitedSymbols = (input: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return !regex.test(input);
};

export const checkCodesArrayLength = (
  codesArray: string[],
  newCode: string,
  length: number
): string[] => {
  const arrayClone = [...codesArray];
  if (arrayClone.length === length) {
    arrayClone.shift();
  }
  arrayClone.push(newCode);
  return arrayClone;
};
