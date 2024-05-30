import { ConstraintValidateFuncParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isStringLengthAboveValue } from '../utils';

export const validateMaxLength = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.maxLength) return;
  if (isStringLengthAboveValue(element.value.trim(), rule.maxLength.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.maxLength,
      rule: rule.maxLength,
    });
};
