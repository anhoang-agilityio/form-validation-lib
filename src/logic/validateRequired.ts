import { ConstraintValidateFuncParam } from '../types';
import { isEmptyString } from '../utils';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';

export const validateRequired = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.required) return;
  if (isEmptyString(element.value.trim()))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.required,
      rule: rule.required,
    });
};
