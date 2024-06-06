import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';
import { DEFAULT_PHONE_PATTERN } from '../constants';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validatePhone = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.valueAsPhone ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (!isMatchPattern(element.value.trim(), DEFAULT_PHONE_PATTERN))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsPhone,
      rule: rule.valueAsPhone,
    });
};
