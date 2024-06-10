import {
  FieldGroup,
  SyncValidationConfig,
  TextField,
  ValidationConfig,
} from './types';
import { isCheckboxOrRadio, isFileInput, isSelectionBox } from './utils';
import {
  refactorValidationConfig,
  resetValidationEffect,
  updateValidationEffect,
  validateField,
  validateForm,
} from './logic';

export const register = (form: HTMLFormElement, config: ValidationConfig) => {
  const standardConfig = refactorValidationConfig(config);
  addIndividualInputsEvent(form, standardConfig);
  addFormEvent(form, standardConfig);
};

const addIndividualInputsEvent = (
  form: HTMLFormElement,
  standardConfig: SyncValidationConfig,
) => {
  Object.entries(standardConfig).forEach(([name, validationRule]) => {
    const element = form.elements.namedItem(name) as FieldGroup;
    if (element === null) return;
    if (element instanceof RadioNodeList) {
      element.forEach((input) => {
        input.addEventListener('focus', () => resetValidationEffect(element));
      });
    } else {
      element.addEventListener('focus', () => resetValidationEffect(element));
    }
    if (
      !isSelectionBox(element) &&
      !isCheckboxOrRadio(element) &&
      !isFileInput(element)
    ) {
      element.addEventListener('blur', async () => {
        const error = await validateField(
          element as FieldGroup,
          validationRule,
        );
        updateValidationEffect(element as TextField, error);
      });
    }
  });
};

const addFormEvent = (
  form: HTMLFormElement,
  standardConfig: SyncValidationConfig,
) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formError = await validateForm(form, standardConfig);
    Object.keys(standardConfig).forEach((fieldName) => {
      const element = form.elements.namedItem(fieldName) as FieldGroup;
      if (element === null) return;
      updateValidationEffect(element, formError[fieldName]);
    });
  });
};
