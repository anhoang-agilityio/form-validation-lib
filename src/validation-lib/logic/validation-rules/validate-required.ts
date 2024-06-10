import { FieldGroup } from '../../types';
import { isEmptyString } from '../../utils';
import { isCheckboxOrRadio } from '../../utils';
import { isCheckboxRadioChecked } from '../../utils';
import { isFileInput } from '../../utils';

export const validateRequired = (element: FieldGroup) => {
  return (
    (isFileInput(element) && element.files?.length) ||
    (isCheckboxOrRadio(element) && isCheckboxRadioChecked(element)) ||
    (!isFileInput(element) &&
      !isCheckboxOrRadio(element) &&
      !isEmptyString(element.value.trim()))
  );
};
