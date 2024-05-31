import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';

export const validateCustomRules = async ({
  element,
  rule,
  formError,
}: FieldValidationParam) => {
  const customRules = rule.customRules;
  if (!customRules) return;
  for (const [constraint, rule] of Object.entries(customRules)) {
    const result = await rule.validationFunc();
    if (!result)
      updateFormError({
        formError: formError,
        fieldName: element.name,
        constraint: constraint,
        rule: rule,
      });
  }
};
