import { TextField } from '../../types';
import { isNumberMoreThanValue, isValidNumber } from '../../utils';

export const validateMaxValue = (element: TextField, maxValue: number) => {
  return (
    isValidNumber(element.value.trim()) &&
    !isNumberMoreThanValue(element.value.trim(), maxValue)
  );
};
