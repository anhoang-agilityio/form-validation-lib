import {
  FormError,
  FieldElement,
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
      const element = elements.namedItem(fieldName);
      if (element === null) continue;
      await validateField({
        element: element as FieldElement,
        rule: validationRule,
        formError: formError,
      });
    }
    return formError;
  };
};
