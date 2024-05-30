import {
  ValidationRules,
  ValidateFunc,
  FormError,
  InputValidationRules,
} from './types';
import { TextFieldElement } from './types';
import Validation from './logic';
import { INPUT_VALIDATION_RULES } from './constants';
import { validateCustomRules } from './logic/validateCustomRules';

export const register = (
  form: HTMLFormElement,
  config: Record<string, ValidationRules>,
): ValidateFunc => {
  return async () => {
    const formError: FormError = {};
    const elements = form.elements;

    for (const [fieldName, validationRule] of Object.entries(config)) {
      const element = elements.namedItem(fieldName) as TextFieldElement;

      for (const constraint of Object.keys(validationRule)) {
        const param = {
          element: element,
          rule: validationRule,
          formError: formError,
        };
        if (constraint === INPUT_VALIDATION_RULES.customRules) {
          await validateCustomRules(param);
        } else {
          Validation[constraint as keyof InputValidationRules](param);
        }
      }
    }
    return formError;
  };
};
