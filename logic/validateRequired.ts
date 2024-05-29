import { TextFieldElement } from '../types/form';

export const validateRequired = (element: TextFieldElement): boolean => {
  return !!element.value;
};
