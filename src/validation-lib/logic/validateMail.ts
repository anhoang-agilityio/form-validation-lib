import { FieldValidationParam } from '../types';
import { updateFormError } from './updateFormError';
import { INPUT_VALIDATION_RULES } from '../constants';
import { isMatchPattern } from '../utils';
import { DEFAULT_MAIL_PATTERN } from '../constants';
import { isCheckBoxOrRadio } from '../utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from '../utils/isSelectionBox.ts';
import { isFileInput } from '../utils/isFileInput.ts';

export const validateMail = ({
  element,
  rule,
  formError,
}: FieldValidationParam): void => {
  if (
    !rule.valueAsMail ||
    isCheckBoxOrRadio(element) ||
    isSelectionBox(element) ||
    isFileInput(element)
  )
    return;
  if (!isMatchPattern(element.value.trim(), DEFAULT_MAIL_PATTERN))
    updateFormError({
      formError: formError,
      fieldName: element.name,
      constraint: INPUT_VALIDATION_RULES.valueAsMail,
      rule: rule.valueAsMail,
    });
};
