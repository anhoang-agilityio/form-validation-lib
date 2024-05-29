import { ValidationConfig, ValidateFunc, FormError } from './types/validation';
import { TextFieldElement } from './types/form';
import { INPUT_VALIDATION_RULES, DEFAULT_MESSAGE } from './constants';
import { validateRequired } from './logic/validateRequired';

export const register = (
  form: HTMLFormElement,
  config: Record<string, ValidationConfig>,
): ValidateFunc => {
  return () => {
    const formError: FormError = {};
    const elements = form.elements;

    // traverse registered form elements
    Object.entries(config).forEach(([name, validationRule]) => {
      const element = elements.namedItem(name) as TextFieldElement;

      Object.entries(validationRule).forEach(([constraint, rule]) => {
        if (rule === undefined) return;

        switch (constraint) {
          case INPUT_VALIDATION_RULES.required:
            if (!validateRequired(element)) {
              formError[name] = Object.assign(formError[name] ?? {}, {
                [INPUT_VALIDATION_RULES.required]: DEFAULT_MESSAGE.required,
              });
            }
        }
      });
    });
    return formError;
  };
};
