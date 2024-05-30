import { ConstraintValidateFuncParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';
import { DEFAULT_PHONE_PATTERN } from '../constants';

export const validatePhone = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.valueAsPhone) return;
  if (isMatchPattern(element.value.trim(), DEFAULT_PHONE_PATTERN))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsPhone,
      rule: rule.valueAsPhone,
    });
};
