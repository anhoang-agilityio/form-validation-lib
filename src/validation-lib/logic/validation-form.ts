import {
  FieldError,
  FieldGroup,
  FormError,
  InputValidationRule,
  Pattern,
  SyncValidationConfig,
  SyncValidationRule,
  ValidationFunc,
} from '../types';
import { INPUT_VALIDATION_RULE } from '../constants';
import {
  validateCustomRule,
  validateMaxLength,
  validateMaxValue,
  validateMinLength,
  validateMinValue,
  validatePattern,
  validateRequired,
} from './validation-rules';
import { isCheckboxOrRadio, isFileInput, isSelectionBox } from '../utils';

export const validateForm = async (
  form: HTMLFormElement,
  config: SyncValidationConfig,
) => {
  const formError: FormError = {};
  const elements = form.elements;
  for (const [fieldName, validationRule] of Object.entries(config)) {
    const element = elements.namedItem(fieldName);
    if (element === null) continue;
    const error = await validateField(element as FieldGroup, validationRule);
    if (error) formError[fieldName as keyof FormError] = error;
  }
  return formError;
};

export const validateField = async (
  element: FieldGroup,
  validationRule: SyncValidationRule,
): Promise<FieldError | undefined> => {
  const valid = undefined;
  let _temp: FieldError | undefined = valid;
  for (const [type, rule] of Object.entries(validationRule)) {
    if (rule) {
      const error = { type: type, message: rule.message };
      switch (type as keyof InputValidationRule) {
        case INPUT_VALIDATION_RULE.required:
          _temp = rule.value && validateRequired(element) ? valid : error;
          break;
        case INPUT_VALIDATION_RULE.minLength:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            validateMinLength(element, rule.value as number)
              ? valid
              : error;
          break;
        case INPUT_VALIDATION_RULE.maxLength:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            validateMaxLength(element, rule.value as number)
              ? valid
              : error;
          break;
        case INPUT_VALIDATION_RULE.pattern:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            validatePattern(element, rule.value as Pattern)
              ? valid
              : error;
          break;
        case INPUT_VALIDATION_RULE.minValue:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            validationRule.pattern?.value !== 'number' ||
            validateMinValue(element, rule.value as number)
              ? valid
              : error;
          break;
        case INPUT_VALIDATION_RULE.maxValue:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            validationRule.pattern?.value !== 'number' ||
            validateMaxValue(element, rule.value as number)
              ? valid
              : error;
          break;
        case INPUT_VALIDATION_RULE.customRule:
          _temp =
            isCheckboxOrRadio(element) ||
            isSelectionBox(element) ||
            isFileInput(element) ||
            (await validateCustomRule(element, rule.value as ValidationFunc))
              ? valid
              : error;
          break;
      }
      if (_temp === error) break;
    }
  }
  return _temp;
};
