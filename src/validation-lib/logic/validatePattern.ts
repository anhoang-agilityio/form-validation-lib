import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validatePattern = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.pattern ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (!isMatchPattern(element.value.trim(), rule.pattern.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.pattern,
      rule: rule.pattern,
    });
};
