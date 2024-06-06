import { FieldGroup, FormError, ValidationRules } from './types';
import { validateField } from './logic';

const validate = async (
  form: HTMLFormElement,
  config: Record<string, ValidationRules>,
) => {
  const formError: FormError = {};
  const elements = form.elements;
  for (const [fieldName, validationRule] of Object.entries(config)) {
    const element = elements.namedItem(fieldName);
    if (element === null) continue;
    await validateField({
      element: element as FieldGroup,
      rule: validationRule,
      formError: formError,
    });
  }
  return formError;
};

export const register = (
  form: HTMLFormElement,
  config: Record<string, ValidationRules>,
) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = await validate(form, config);
    for (const name of Object.keys(config)) {
      const input = form.elements.namedItem(name);
      if (input === null) continue;

      const formGroup = (
        input instanceof RadioNodeList ? (input[0] as Element) : input
      ).closest('[data-form-group]') as HTMLElement;
      const errorElement = formGroup.querySelector(
        '[data-form-error]',
      ) as HTMLElement;

      const fieldError = errors[name];

      if (!fieldError) {
        formGroup.classList.add('is-valid');
        continue;
      }

      const errorMsg = Object.values(fieldError)[0];
      formGroup.classList.add('is-invalid');
      errorElement.innerText = errorMsg;

      formGroup.addEventListener('focus', () => {
        formGroup.classList.remove('is-valid', 'is-invalid');
        errorElement.innerText = '';
      });
    }
  });
};
