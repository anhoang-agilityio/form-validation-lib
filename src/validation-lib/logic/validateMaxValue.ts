import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldValidationParam } from '../types';
import { validateNumberType } from './validateNumberType';
import { isNumberMoreThanValue, isValidNumber } from '../utils';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateMaxValue = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.max ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  rule.valueAsNumber = rule.valueAsNumber ?? true;
  validateNumberType({ element, rule, formError });
  if (
    !isValidNumber(element.value.trim()) ||
    isNumberMoreThanValue(element.value.trim(), rule.max.value)
  )
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.max,
      rule: rule.max,
    });
};
