import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldValidationParam } from '../types';
import { validateNumberType } from './validateNumberType';
import { isNumberLessThanValue, isValidNumber } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateMinValue = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.min ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  rule.valueAsNumber = rule.valueAsNumber ?? true;
  validateNumberType({ element, rule, formError });
  if (
    !isValidNumber(element.value.trim()) ||
    isNumberLessThanValue(element.value.trim(), rule.min.value)
  )
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.min,
      rule: rule.min,
    });
};
