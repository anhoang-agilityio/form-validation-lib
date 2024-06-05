import { INPUT_VALIDATION_RULES } from '../constants';
import { FieldElement } from './form';

export type InputValidationRules = typeof INPUT_VALIDATION_RULES;

type ValidationMessage = {
  message: string;
};

export type CustomValidationValue = {
  validationFunc: () => boolean | Promise<boolean>; // return true if valid, otherwise false
} & ValidationMessage;

export type CustomValidationRules = Record<string, CustomValidationValue>;

export type ValidationRules = Partial<{
  required: true | ValidationMessage;
  minLength: { value: number } & Partial<ValidationMessage>;
  maxLength: { value: number } & Partial<ValidationMessage>;
  valueAsNumber: true | ValidationMessage;
  min: { value: number } & Partial<ValidationMessage>;
  max: { value: number } & Partial<ValidationMessage>;
  valueAsDate: true | ValidationMessage;
  valueAsMail: true | ValidationMessage;
  valueAsPhone: true | ValidationMessage;
  pattern: { value: RegExp } & Partial<ValidationMessage>;
  customRules: CustomValidationRules;
}>;

export type FormError = Partial<Record<string, Record<string, string>>>;

export type ValidateFunc = () => Promise<FormError>;

export type FieldValidationParam = {
  element: FieldElement;
  rule: ValidationRules;
  formError: FormError;
};
