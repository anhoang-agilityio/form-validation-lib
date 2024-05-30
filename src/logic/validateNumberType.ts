import { ConstraintValidateFuncParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isValidNumber } from '../utils';

export const validateNumberType = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.valueAsNumber) return;
  if (isValidNumber(element.value.trim()))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsNumber,
      rule: rule.valueAsNumber,
    });
};
