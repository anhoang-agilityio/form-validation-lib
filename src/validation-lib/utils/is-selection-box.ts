import { FieldGroup } from '../types';

export const isSelectionBox = (
  field: FieldGroup,
): field is HTMLSelectElement => {
  return field instanceof HTMLSelectElement;
};
