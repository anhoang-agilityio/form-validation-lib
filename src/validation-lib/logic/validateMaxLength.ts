import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isStringLengthAboveValue } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateMaxLength = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.maxLength ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (isStringLengthAboveValue(element.value.trim(), rule.maxLength.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.maxLength,
      rule: rule.maxLength,
    });
};
