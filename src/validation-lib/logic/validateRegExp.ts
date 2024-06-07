import { TextField } from '../types';
import { isMatchPattern } from '../utils';

export const validateRegExp = (element: TextField, regExp: RegExp) => {
  return isMatchPattern(element.value.trim(), regExp);
};