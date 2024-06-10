import { Pattern, TextField } from '../../types';
import { DEFAULT_EMAIL_PATTERN, DEFAULT_PHONE_PATTERN } from '../../constants';
import { validateNumber } from './validate-number.ts';
import { validateDate } from './validate-date.ts';
import { validateRegexp } from './validate-regexp.ts';

export const validatePattern = (element: TextField, pattern: Pattern) => {
  switch (pattern) {
    case 'number':
      return validateNumber(element);
    case 'date':
      return validateDate(element);
    case 'email':
      return validateRegexp(element, DEFAULT_EMAIL_PATTERN);
    case 'phone':
      return validateRegexp(element, DEFAULT_PHONE_PATTERN);
    default:
      return validateRegexp(element, pattern);
  }
};
