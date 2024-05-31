import { isMatchPattern } from './isMatchPattern';

export const isValidDate = (value: string) => {
  // suppose the valid date format is DD/MM/YYYY
  const datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!isMatchPattern(value, datePattern)) {
    return false;
  }
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date.getDate() === day
  );
};
