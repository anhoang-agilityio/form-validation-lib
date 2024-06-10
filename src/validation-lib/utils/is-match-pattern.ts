export const isMatchPattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};
