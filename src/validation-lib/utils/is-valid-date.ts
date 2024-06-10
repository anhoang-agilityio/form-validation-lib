import { isMatchPattern } from './is-match-pattern.ts';

export const isValidDate = (value: string) => {
  // suppose the valid date format is YYYY-MM-DD
  const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (!isMatchPattern(value, datePattern)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date.getDate() === day
  );
};
