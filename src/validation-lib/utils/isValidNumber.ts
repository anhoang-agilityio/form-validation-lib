export const isValidNumber = (value: string): boolean => {
  return !(value === '' || isNaN(Number(value)));
};
