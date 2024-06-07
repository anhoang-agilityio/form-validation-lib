import { TextField } from '../types';
import { isValidNumber } from '../utils';

export const validateNumber = (element: TextField) => {
  return isValidNumber(element.value.trim());
};
