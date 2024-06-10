import { TextField } from '../../types';
import { isStringLengthUnderValue } from '../../utils';

export const validateMinLength = (
  element: TextField,
  minLength: number,
): boolean => {
  return !isStringLengthUnderValue(element.value.trim(), minLength);
};
