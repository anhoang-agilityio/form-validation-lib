import { TextField } from '../types';
import { DEFAULT_PHONE_PATTERN } from '../constants';
import { isMatchPattern } from '../utils';

export const validatePhone = (element: TextField) => {
  return isMatchPattern(element.value.trim(), DEFAULT_PHONE_PATTERN);
};
