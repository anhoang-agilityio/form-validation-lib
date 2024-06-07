import {
  DefaultErrorMessage,
  FieldError,
  FieldGroup,
  FormError,
  InputValidationRule,
  Pattern,
  SyncValidationConfig,
  SyncValidationRule,
  TextField,
  ValidationConfig,
  ValidationFunc,
  ValidationRule,
} from './types';
import { DEFAULT_ERROR_MESSAGE, INPUT_VALIDATION_RULE } from './constants';
import { isObject } from './utils/isObject.ts';
import { isRegExp } from './utils/isRegExp.ts';
import { isMessage } from './utils/isMessage.ts';
import { validateRequired } from './logic/validateRequired.ts';
import { isCheckBoxOrRadio } from './utils/isCheckBoxOrRadio.ts';
import { isSelectionBox } from './utils/isSelectionBox.ts';
import { isFileInput } from './utils/isFileInput.ts';
import { validateMinLength } from './logic/validateMinLength.ts';
import { validateMaxLength } from './logic/validateMaxLength.ts';
import { validatePattern } from './logic/validatePattern.ts';
import { validateMinValue } from './logic/validateMinValue.ts';
import { validateMaxValue } from './logic/validateMaxValue.ts';
import { validateCustomRule } from './logic/validateCustomRule.ts';

const validateForm = async (
  form: HTMLFormElement,
  config: SyncValidationConfig,
) => {
  const formError: FormError = {};
  const elements = form.elements;
  for (const [fieldName, validationRule] of Object.entries(config)) {
    const element = elements.namedItem(fieldName);
    if (element === null) continue;
    const error = await validateField1(element as FieldGroup, validationRule);
    if (error) formError[fieldName as keyof FormError] = error;
  }
  return formError;
};

const updateValidationEffect = (element: FieldGroup, error?: FieldError) => {
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
  errorElement && (errorElement.textContent = error.message);
};

const resetValidationEffect = (element: FieldGroup) => {
  const formGroup = (
    element instanceof RadioNodeList ? (element[0] as Element) : element
  ).closest('[data-form-group]') as HTMLElement;

  const errorElement = formGroup.querySelector('[data-form-error]');

  formGroup.classList.remove('is-valid', 'is-invalid');
  errorElement && (errorElement.textContent = '');
};

const validateField1 = async (
  element: FieldGroup,
  validationRule: SyncValidationRule,
): Promise<FieldError | undefined> => {
  const valid = undefined;
  let _temp: FieldError | undefined = valid;
  loop: for (const [type, rule] of Object.entries(validationRule)) {
    if (rule) {
      const error = { type: type, message: rule.message };
      switch (type as keyof InputValidationRule) {
        case INPUT_VALIDATION_RULE.required:
          _temp = rule.value && validateRequired(element) ? valid : error;
          break loop;
        case INPUT_VALIDATION_RULE.minLength:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            validateMinLength(element, rule.value as number)
              ? valid
              : error;
          break loop;
        case INPUT_VALIDATION_RULE.maxLength:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            validateMaxLength(element, rule.value as number)
              ? valid
              : error;
          break loop;
        case INPUT_VALIDATION_RULE.pattern:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            validatePattern(element, rule.value as Pattern)
              ? valid
              : error;
          break loop;
        case INPUT_VALIDATION_RULE.minValue:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            validationRule.pattern?.value === 'number' &&
            validateMinValue(element, rule.value as number)
              ? valid
              : error;
          break loop;
        case INPUT_VALIDATION_RULE.maxValue:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            validationRule.pattern?.value === 'number' &&
            validateMaxValue(element, rule.value as number)
              ? valid
              : error;
          break loop;
        case INPUT_VALIDATION_RULE.customRule:
          _temp =
            !isCheckBoxOrRadio(element) &&
            !isSelectionBox(element) &&
            !isFileInput(element) &&
            (await validateCustomRule(element, rule.value as ValidationFunc))
              ? valid
              : error;
          break loop;
      }
    }
  }
  return _temp;
};

export const register = (form: HTMLFormElement, config: ValidationConfig) => {
  const standardConfig = refactorValidationConfig(config);
  // loop config obj and add listeners for inputs:
  // radio, checkbox, selection, file input: reset - onFocus
  // normal inputs: validate + addEffect - onBlur & reset - onFocus
  Object.entries(standardConfig).forEach(([name, validationRule]) => {
    const element = form.elements.namedItem(name);
    if (element === null) return;
    if (element instanceof RadioNodeList) {
      element.forEach((input) => {
        input.addEventListener('focus', () => resetValidationEffect(element));
      });
    } else {
      element.addEventListener('focus', () =>
        resetValidationEffect(element as FieldGroup),
      );
    }
    if (
      !isSelectionBox(element as FieldGroup) &&
      !isCheckBoxOrRadio(element as FieldGroup) &&
      !isFileInput(element as FieldGroup)
    ) {
      (element as TextField).addEventListener('blur', async () => {
        const error = await validateField1(
          element as FieldGroup,
          validationRule,
        );
        updateValidationEffect(element as TextField, error);
      });
    }
  });

  // form: add event listener for form when submit
  // submit handler:
  // loop config obj : validate form
  // loop config obj: addEffect for inputs, radio, checkbox, selection, file

  // reset: remove validation classes on form group & remove validation message if error container presents
  // addEffect: check if field is valid. ...

  // validate:
  // we want validate form is an aggregation of validate each field
  // structure of form error is still the same
  // field validation will return FieldError object specified above

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formError = await validateForm(form, standardConfig);
    Object.keys(standardConfig).forEach((name) =>
      updateValidationEffect(
        form.elements.namedItem(name) as FieldGroup,
        formError[name],
      ),
    );
  });
};

////////////////////////////////

function refactorValidationConfig(config: ValidationConfig) {
  return Object.entries(config).reduce((result, [name, rule]) => {
    result[name] = refactorRule(rule);
    return result;
  }, {} as SyncValidationConfig);
}

const refactorRule = (rule: ValidationRule) => {
  // reorder keys
  const reorderedRule = reorderObjectKey(
    rule,
    Object.keys(INPUT_VALIDATION_RULE) as (keyof InputValidationRule)[],
  );
  // sync validation value
  return syncValidationValue(reorderedRule);
};

function reorderObjectKey<T extends object>(obj: T, keys: (keyof T)[]): T {
  return keys.reduce((result, key) => {
    if (obj[key]) result[key] = obj[key];
    return result;
  }, {} as T);
}

function syncValidationValue(rule: ValidationRule): SyncValidationRule {
  return Object.entries(rule).reduce((result, [name, validationData]) => {
    // get error message type
    const errMsgType = (
      name !== 'pattern'
        ? name
        : isRegExp(rule.pattern)
          ? 'regExp'
          : isObject(rule.pattern)
            ? rule.pattern.value
            : rule.pattern
    ) as keyof DefaultErrorMessage;
    // get default error message by name / pattern
    const defaultErrMsg = getDefaultErrorMessage(errMsgType);
    // sync validation data to object
    // @ts-ignore
    result[name] = isMessage(validationData)
      ? {
          value: true,
          message: validationData,
        }
      : isObject(validationData) && !isRegExp(validationData)
        ? validationData
        : {
            value: validationData,
            message: defaultErrMsg, // default message
          };

    return result;
  }, {} as SyncValidationRule);
}

const getDefaultErrorMessage = (name: keyof DefaultErrorMessage) =>
  DEFAULT_ERROR_MESSAGE[name];
