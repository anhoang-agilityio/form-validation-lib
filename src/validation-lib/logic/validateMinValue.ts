import { TextField } from '../types';
import { isNumberLessThanValue, isValidNumber } from '../utils';

export const validateMinValue = (element: TextField, minValue: number) => {
  return (
    isValidNumber(element.value.trim()) &&
    !isNumberLessThanValue(element.value.trim(), minValue)
  );
};
