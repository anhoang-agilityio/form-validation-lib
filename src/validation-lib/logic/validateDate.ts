import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isValidDate } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateDate = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.valueAsDate ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (!isValidDate(element.value.trim()))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsDate,
      rule: rule.valueAsDate,
    });
};
