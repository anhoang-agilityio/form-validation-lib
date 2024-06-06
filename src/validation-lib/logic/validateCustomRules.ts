import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateCustomRules = async ({
  element,
  rule,
  formError,
}: FieldValidationParam) => {
  if (
    !rule.customRules ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  const customRules = rule.customRules;
  for (const [constraint, rule] of Object.entries(customRules)) {
    const result = await rule.validationFunc(element.value);
    if (!result)
      updateFormError({
        formError: formError,
        fieldName: element.name,
        constraint: constraint,
        rule: rule,
      });
  }
};
