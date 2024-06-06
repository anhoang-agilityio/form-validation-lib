import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldValidationParam } from '../types';
import { isStringLengthUnderValue } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateMinLength = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.minLength ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (isStringLengthUnderValue(element.value.trim(), rule.minLength.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.minLength,
      rule: rule.minLength,
    });
};
