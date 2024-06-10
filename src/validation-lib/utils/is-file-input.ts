import { FieldGroup } from '../types';

export const isFileInput = (field: FieldGroup): field is HTMLInputElement => {
  return !(field instanceof RadioNodeList) && field.type === 'file';
};
