import { Pattern, TextField } from '../types';
import { DEFAULT_EMAIL_PATTERN, DEFAULT_PHONE_PATTERN } from '../constants';
import { validateNumber } from './validateNumber.ts';
import { validateDate } from './validateDate.ts';
import { validateRegExp } from './validateRegExp.ts';

export const validatePattern = (element: TextField, pattern: Pattern) => {
  switch (pattern) {
    case 'number':
      return validateNumber(element);
    case 'date':
      return validateDate(element);
    case 'email':
      return validateRegExp(element, DEFAULT_EMAIL_PATTERN);
    case 'phone':
      return validateRegExp(element, DEFAULT_PHONE_PATTERN);
    default:
      return validateRegExp(element, pattern);
  }
};
