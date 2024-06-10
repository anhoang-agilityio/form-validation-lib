import { TextField } from '../../types';
import { isValidDate } from '../../utils';

export const validateDate = (element: TextField) => {
  return isValidDate(element.value.trim());
};
