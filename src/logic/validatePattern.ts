import { ConstraintValidateFuncParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';

export const validatePattern = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.pattern) return;
  if (isMatchPattern(element.value.trim(), rule.pattern.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.pattern,
      rule: rule.pattern,
    });
};
