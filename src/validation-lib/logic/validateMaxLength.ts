import { TextField } from '../types';
import { isStringLengthAboveValue } from '../utils';

export const validateMaxLength = (
  element: TextField,
  maxLength: number,
): boolean => {
  return !isStringLengthAboveValue(element.value.trim(), maxLength);
};
