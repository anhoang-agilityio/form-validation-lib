import { isValidNumber } from './isValidNumber';

export const isNumberMoreThanValue = (
  _number: string,
  value: number,
): boolean => {
  return isValidNumber(_number) && Number(_number) > value;
};
