import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldValidationParam } from '../types';
import { validateNumberType } from './validateNumberType';
import { isNumberLessThanValue, isValidNumber } from '../utils';

export const validateMinValue = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (!rule.min) return;
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
