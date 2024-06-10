import { TextField, ValidationFunc } from '../../types';

export const validateCustomRule = async (
  element: TextField,
  func: ValidationFunc,
) => {
  return func(element.value.trim());
};
