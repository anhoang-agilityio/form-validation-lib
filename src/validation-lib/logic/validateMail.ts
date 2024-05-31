import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';
import { DEFAULT_MAIL_PATTERN } from '../constants';

export const validateMail = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (!rule.valueAsMail) return;
  if (!isMatchPattern(element.value.trim(), DEFAULT_MAIL_PATTERN))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsMail,
      rule: rule.valueAsMail,
    });
};
