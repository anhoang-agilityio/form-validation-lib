import { FieldGroup } from '../types';
import { isEmptyString } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isCheckBoxRadioChecked } from '../utils/isCheckBoxRadioChecked.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateRequired = (element: FieldGroup) => {
  return !(
    (isFileInput(element) && !element.files?.length) ||
    (isCheckBoxOrRadio(element) && !isCheckBoxRadioChecked(element)) ||
    isEmptyString(element.value.trim())
  );
};
