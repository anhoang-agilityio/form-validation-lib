import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isValidDate } from '../utils';

export const validateDate = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (!rule.valueAsDate) return;
  if (!isValidDate(element.value.trim()))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsDate,
      rule: rule.valueAsDate,
    });
};
