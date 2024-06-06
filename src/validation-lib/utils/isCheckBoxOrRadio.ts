import { FieldGroup } from '../types';

export const isCheckBoxOrRadio = (
  field: FieldGroup,
): field is HTMLInputElement | RadioNodeList => {
  return (
    (field instanceof RadioNodeList &&
      field[0] instanceof HTMLInputElement &&
      (field[0].type === 'checkbox' || field[0].type === 'radio')) ||
    (!(field instanceof RadioNodeList) &&
      (field.type === 'checkbox' || field.type === 'radio'))
  );
};
