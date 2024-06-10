import { FieldError, FieldGroup } from '../types';

export const updateValidationEffect = (
  element: FieldGroup,
  error?: FieldError,
) => {
  const formGroup = (
    element instanceof RadioNodeList ? (element[0] as Element) : element
  ).closest('[data-form-group]') as HTMLElement;
  const errorElement = formGroup.querySelector('[data-form-error]');

  if (!error) {
    formGroup.classList.add('is-valid');
    errorElement && (errorElement.textContent = '');
    return;
  }

  formGroup.classList.add('is-invalid');
  if (errorElement) errorElement.textContent = error.message;
};

export const resetValidationEffect = (element: FieldGroup) => {
  const formGroup = (
    element instanceof RadioNodeList ? (element[0] as Element) : element
  ).closest('[data-form-group]') as HTMLElement;

  const errorElement = formGroup.querySelector('[data-form-error]');

  formGroup.classList.remove('is-valid', 'is-invalid');
  errorElement && (errorElement.textContent = '');
};
