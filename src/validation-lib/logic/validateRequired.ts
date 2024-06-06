import { FieldValidationParam } from '../types';
import { isEmptyString } from '../utils';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isCheckBoxRadioChecked } from '../utils/isCheckBoxRadioChecked.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateRequired = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (!rule.required) return;
  if (
    (isFileInput(element) && !element.files?.length) ||
    (isCheckBoxOrRadio(element) && !isCheckBoxRadioChecked(element)) ||
    isEmptyString(element.value.trim())
  )
    updateFormError({
      formError: formError,
      fieldName:
        element instanceof RadioNodeList
          ? (element[0] as HTMLInputElement).name
          : element.name,
      constraint: INPUT_VALIDATION_RULES.required,
      rule: rule.required,
    });
};
