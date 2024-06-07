import { TextField } from '../types';
import { DEFAULT_EMAIL_PATTERN } from '../constants';
import { isMatchPattern } from '../utils';

export const validateEmail = (element: TextField) => {
  return isMatchPattern(element.value.trim(), DEFAULT_EMAIL_PATTERN);
};
