import {
  FormError,
  TextFieldElement,
  ValidateFunc,
  ValidationRules,
} from './types';
import { validateField } from './logic';

export const register = (
  form: HTMLFormElement,
  config: Record<string, ValidationRules>,
): ValidateFunc => {
  return async () => {
    const formError: FormError = {};
    const elements = form.elements;
    for (const [fieldName, validationRule] of Object.entries(config)) {
      const element = elements.namedItem(fieldName) as TextFieldElement;
      await validateField({
        element: element,
        rule: validationRule,
        formError: formError,
      });
    }
    return formError;
  };
};
