import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { ConstraintValidateFuncParam } from '../types';
import { validateNumberType } from './validateNumberType';
import { isNumberMoreThanValue } from '../utils';

export const validateMaxValue = ({
  element,
  rule,
  formError,
}: ConstraintValidateFuncParam): void => {
  if (!rule.max) return;
  rule.valueAsNumber = rule.valueAsNumber ?? true;
  validateNumberType({ element, rule, formError });
  if (isNumberMoreThanValue(element.value.trim(), rule.max.value))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.max,
      rule: rule.max,
    });
};
